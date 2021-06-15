// External Packages
import { GraphQLDateTime } from 'graphql-custom-types';

// Utils
import { compose } from '../../utils/composable';
import { authResolver } from '../../utils/auth';
import { search } from '../../utils/format';

// Entities
import { Measurements } from '../../entities/Measurements';

// Model
import {
  countMeasurements,
  getLastFiveMeasurements,
  getMeasurements,
} from '../../models/model';

// Global Variables
const dataLimit = 3;
const addDataPub = 'NEW_DOCUMENT';
const lastFiveDataPub = 'LAST_FIVE_DATA';
const countDataPub = 'COUNT_DATA';

export const resolvers = {
  Subscription: {
    // Add Data Publish
    addDataPub: {
      subscribe: (_: any, __: any, context: any) =>
        context.pubsub.asyncIterator([addDataPub]),
    },
    // Last Five Data Publish
    lastFiveDataPub: {
      subscribe: (_: any, __: any, context: any) =>
        context.pubsub.asyncIterator([lastFiveDataPub]),
    },
    // Count Data Publish
    countDataPub: {
      subscribe: (_: any, __: any, context: any) =>
        context.pubsub.asyncIterator([countDataPub]),
    },
  },
  Query: {
    getRecordsCount: compose(authResolver)(async (_: any, args: any) => {
      const { userId } = args;
      return await countMeasurements(userId);
    }),
    // Get Measurements for Chart
    getLastFiveMeasurements: compose(authResolver)(
      async (_: any, args: any) => {
        const { userId } = args;

        return await getLastFiveMeasurements(userId);
      }
    ),
    // Get Measurements By Page
    getMeasurementsByPage: compose(authResolver)(async (_: any, args: any) => {
      const { symbol, weight, userId, page = 1 } = args;

      let where = { user: userId, deletedAt: null } as any;
      if (weight) where.weight = search(symbol, weight);

      return await getMeasurements(where, dataLimit, page);
    }),
  },
  Mutation: {
    // Add Measurement
    addMeasurement: compose(authResolver)(async (_: any, args: any, ctx) => {
      const { weight, date, userId } = args;

      const measurement = new Measurements();
      measurement.weight = weight;
      measurement.weighingDate = date;
      measurement.user = userId;
      await measurement.save();

      // Subscriptions
      ctx.pubsub.publish(addDataPub, {
        addDataPub: await getMeasurements(
          { user: userId, deletedAt: null },
          dataLimit,
          1
        ),
      });

      ctx.pubsub.publish(lastFiveDataPub, {
        lastFiveDataPub: await getLastFiveMeasurements(userId),
      });

      ctx.pubsub.publish(countDataPub, {
        countDataPub: await countMeasurements(userId),
      });

      return 'Successfully added';
    }),
    // Update Measurement
    updateMeasurement: compose(authResolver)(async (_: any, args: any, ctx) => {
      const { id, weight, userId, page = 1 } = args;

      const measurement = await Measurements.findOne(id);
      if (measurement) {
        measurement.weight = weight;
        await measurement.save();
      }

      const { data, totalPages } = await getMeasurements(
        { user: userId, deletedAt: null },
        dataLimit,
        page
      );

      // Subscriptions
      ctx.pubsub.publish(addDataPub, {
        addDataPub: {
          data,
          totalPages,
        },
      });

      ctx.pubsub.publish(lastFiveDataPub, {
        lastFiveDataPub: await getLastFiveMeasurements(userId),
      });

      return { data, totalPages };
    }),
    // Remove Measurement
    removeMeasurement: compose(authResolver)(async (_: any, args: any, ctx) => {
      const { id, userId, page } = args;

      const measurement = await Measurements.findOne(id);
      if (measurement) {
        measurement.deletedAt = new Date();
        await measurement.save();
      }

      const { data, totalPages } = await getMeasurements(
        { user: userId, deletedAt: null },
        dataLimit,
        page
      );

      // Subscriptions
      ctx.pubsub.publish(lastFiveDataPub, {
        lastFiveDataPub: await getLastFiveMeasurements(userId),
      });

      ctx.pubsub.publish(countDataPub, {
        countDataPub: await countMeasurements(userId),
      });

      return { data, totalPages };
    }),
  },
  GraphQLDateTime,
};
