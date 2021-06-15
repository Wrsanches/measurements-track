// React
import React, { useState } from 'react';

// Global Components
import { Container, PageTitle } from '../../components';

// Styled Components
import { Document, FirstSection, SecondSection } from './styles';

// Page Components
import { LineChart, MeasurementsForm, Timeline } from './components';

// Redux
import { useSelector } from 'react-redux';

// Apollo
import { useQuery, useSubscription } from '@apollo/client';

// GraphQL
import { GET_RECORDS_COUNT } from '../../graphql/queries';
import { COUNT_DATA_PUB } from '../../graphql/subscriptions';

const Dash = () => {
  const [count, setCount] = useState();
  const userId = useSelector((state) => parseInt(state.auth.id));
  const firstName = useSelector((state) => state.auth.firstName);

  useQuery(GET_RECORDS_COUNT, {
    variables: { userId },
    onCompleted: (newData) => setCount(newData.getRecordsCount)
  });

  useSubscription(COUNT_DATA_PUB, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { countDataPub }
      }
    }) => {
      setCount(countDataPub);
    }
  });

  return (
    <Container title="Dash">
      <PageTitle
        primaryText={`Welcome ${firstName},`}
        secondaryText={`there are ${count} records`}
      />
      <Document>
        <FirstSection>
          <LineChart />
          <MeasurementsForm />
        </FirstSection>
        <SecondSection>
          <Timeline />
        </SecondSection>
      </Document>
    </Container>
  );
};

export default Dash;
