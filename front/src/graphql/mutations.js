import { gql } from '@apollo/client';

export const ADD_MEASUREMENT = gql`
  mutation addMeasurement($weight: Float!, $date: DateTime!, $userId: Int!) {
    addMeasurement(weight: $weight, date: $date, userId: $userId)
  }
`;

export const UPDATE_MEASUREMENT = gql`
  mutation updateMeasurement(
    $id: Int!
    $weight: Float!
    $userId: Int!
    $page: Int!
  ) {
    updateMeasurement(id: $id, weight: $weight, userId: $userId, page: $page) {
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

export const REMOVE_MEASUREMENT = gql`
  mutation removeMeasurement($id: Int!, $userId: Int!, $page: Int!) {
    removeMeasurement(id: $id, userId: $userId, page: $page) {
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
