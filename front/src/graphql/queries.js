// Apollo
import { gql } from '@apollo/client';

export const GET_MEASUREMENTS_BY_PAGE = gql`
  query getMeasurementsByPage($symbol: String, $weight: Float, $userId: Int!, $page: Int) {
    getMeasurementsByPage(symbol: $symbol, weight: $weight, userId: $userId, page: $page) {
      data {
        id
        weight
        weighingDate
        createdAt
        updatedAt
      }
      totalPages
    }
  }
`;

export const GET_LAST_FIVE_MEASUREMENTS = gql`
  query getLastFiveMeasurements($userId: Int!) {
    getLastFiveMeasurements(userId: $userId) {
      labels
      datasets
    }
  }
`;

export const GET_RECORDS_COUNT = gql`
  query getRecordsCount($userId: Int!) {
    getRecordsCount(userId: $userId)
  }
`;
