// React
import React, { useState, useEffect } from 'react';

// Global Components
import { Section } from '../../../../components';

// Chart.js
import { Line } from 'react-chartjs-2';

// Redux
import { useSelector } from 'react-redux';

// GraphQL
import { LAST_FIVE_DATA_PUB } from '../../../../graphql/subscriptions';
import { GET_LAST_FIVE_MEASUREMENTS } from '../../../../graphql/queries';

// Apollo
import { useQuery, useSubscription } from '@apollo/client';

const LineChart = () => {
  const [data, setData] = useState();

  const userId = useSelector((state) => parseInt(state.auth.id));

  const getLastFiveMeasurements = useQuery(GET_LAST_FIVE_MEASUREMENTS, {
    variables: { userId }
  });

  const lastFiveDataPub = useSubscription(LAST_FIVE_DATA_PUB);

  useEffect(() => {
    if (getLastFiveMeasurements.data !== undefined) {
      setData(getLastFiveMeasurements.data.getLastFiveMeasurements);
    }
  }, [getLastFiveMeasurements]);

  useEffect(() => {
    if (lastFiveDataPub.data !== undefined) {
      setData(lastFiveDataPub.data.lastFiveDataPub);
    }
  }, [lastFiveDataPub]);

  const dataset = {
    labels: data && data.labels,
    datasets: [
      {
        label: 'Weight',
        data: data && data.datasets,
        fill: true,
        backgroundColor: 'rgba(1, 132, 199, 0.5)',
        borderColor: '#e0f1fe'
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <Section>
      <Line data={dataset} options={options} />
    </Section>
  );
};

export default LineChart;
