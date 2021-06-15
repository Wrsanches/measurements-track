// Utils
import { formatDate } from '../utils/format';

// Entities
import { Measurements } from '../entities/Measurements';

interface IWhere {
  user: number;
  deletedAt: null;
  weight?: any;
}

const countMeasurements = async (userId: number) => {
  return await Measurements.count({
    where: { user: userId, deletedAt: null },
  });
};

const getLastFiveMeasurements = async (userId: number) => {
  const labels = [] as any;
  const datasets = [] as any;

  const measurements = await Measurements.find({
    where: { user: userId, deletedAt: null },
    order: { weighingDate: 'DESC', id: 'DESC' },
    take: 5,
  });

  for (let i = 0; i < measurements.length; i++) {
    const date = new Date(measurements[i].weighingDate);

    labels.push(formatDate(date));
    datasets.push(measurements[i].weight);
  }

  return { labels: labels.reverse(), datasets: datasets.reverse() };
};

const getMeasurements = async (
  where: IWhere,
  dataLimit: number,
  page: number
) => {
  let [items, total] = await Measurements.findAndCount({
    where,
    order: { weighingDate: 'DESC', id: 'DESC' },
    take: dataLimit,
    skip: (page - 1) * dataLimit,
  });

  return { data: items, totalPages: Math.ceil(total / dataLimit) };
};

export { countMeasurements, getLastFiveMeasurements, getMeasurements };
