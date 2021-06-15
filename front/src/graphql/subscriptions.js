import { gql } from '@apollo/client';

export const ADD_DATA_PUB = gql`
  subscription addDataPub {
    addDataPub {
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

export const LAST_FIVE_DATA_PUB = gql`
  subscription lastFiveDataPub {
    lastFiveDataPub {
      labels
      datasets
    }
  }
`;

export const COUNT_DATA_PUB = gql`
  subscription countDataPub {
    countDataPub
  }
`;
