// React
import React, { useState, useEffect } from 'react';

// Global Components
import { Section, FormItem } from '../../../../components';

// Styled Components
import {
  TimelineHeader,
  TimelineBody,
  TimelineFooter,
  TimelineItem,
  Line,
  TimePoint,
  Data,
  Date,
  Card,
  Item,
  Action,
  EditInput,
  Button
} from './styles';

// Utils
import { formatDate } from '../../../../utils/format';

// Redux
import { useSelector } from 'react-redux';

// GraphQL
import { ADD_DATA_PUB } from '../../../../graphql/subscriptions';
import { GET_MEASUREMENTS_BY_PAGE } from '../../../../graphql/queries';
import {
  UPDATE_MEASUREMENT,
  REMOVE_MEASUREMENT
} from '../../../../graphql/mutations';

// Apollo
import { useQuery, useSubscription, useMutation } from '@apollo/client';

const Timeline = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({});
  const [editId, setEditId] = useState(0);
  const [editValue, setEditValue] = useState(0);
  const [data, setData] = useState({ data: [], totalPages: 1 });

  const userId = useSelector((state) => parseInt(state.auth.id));

  const getMeasurements = useQuery(GET_MEASUREMENTS_BY_PAGE, {
    variables: { userId, page: 1 }
  });

  const [updateMeasurement] = useMutation(UPDATE_MEASUREMENT, {
    onCompleted: ({ updateMeasurement }) => {
      setData(updateMeasurement);
      setEditId(0);
      setEditValue(0);
    }
  });

  const [removeMeasurement] = useMutation(REMOVE_MEASUREMENT, {
    onCompleted: ({ removeMeasurement }) => {
      setData(removeMeasurement);
    }
  });

  useSubscription(ADD_DATA_PUB, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { addDataPub }
      }
    }) => {
      setData(addDataPub);
    }
  });

  useEffect(() => {
    if (getMeasurements.data !== undefined) {
      setData({ ...getMeasurements.data.getMeasurementsByPage });
    }
  }, [getMeasurements]);

  useEffect(() => {
    getMeasurements.refetch({ ...search, userId, page });
  }, [page, search]);

  const totalPages = data && data.totalPages;

  const handlePage = (type) => {
    if (type === 'next') {
      setPage((page) => page + 1);
    } else if (type === 'prev') {
      setPage((page) => page - 1);
    }
  };

  const handleSearch = (event) => {
    setPage(1);

    const value = event.target.value;

    if (value.length >= 2) {
      let [symbol, weight] = value.split(' ');

      if (weight === undefined) {
        weight = parseFloat(symbol);
        symbol = '=';
      }

      setSearch({ symbol, weight: parseFloat(weight) });

      getMeasurements.refetch({
        symbol: symbol,
        weight: parseFloat(weight),
        userId,
        page: 1
      });
    } else if (value.length === 0) {
      setSearch({ symbol: null, weight: null });
    }
  };

  const handleDelete = (objectId) => {
    const id = parseInt(objectId);
    removeMeasurement({ variables: { id, userId, page } });
  };

  const handleUpdate = (objectId) => {
    const id = parseInt(objectId);
    const weight = parseFloat(editValue);
    updateMeasurement({ variables: { id, weight, userId, page } });
  };

  return (
    <Section>
      <TimelineHeader>
        <FormItem
          helpText='Your search may contain the symbols "<", "<=", ">" or ">=" for easy tracking, e.g. >= 70.8, to find the values  greater and equals to 70.8.'
          label="Search"
          name="search"
          onChange={handleSearch}
        />
      </TimelineHeader>
      <TimelineBody>
        {data.data &&
          data.data.map((item) => (
            <TimelineItem>
              <Line>
                <TimePoint />
              </Line>
              <Data>
                <Date>{formatDate(item.weighingDate)}</Date>
                <Card>
                  {parseInt(item.id) !== editId ? (
                    <>
                      <Item>Weight: {item.weight} kg</Item>
                      <Action>
                        <Button
                          onClick={() => {
                            setEditId(parseInt(item.id));
                            setEditValue(item.weight);
                          }}
                          type="edit">
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          type="delete">
                          Delete
                        </Button>
                      </Action>
                    </>
                  ) : (
                    <>
                      <EditInput
                        name="editWeight"
                        onChange={(e) => setEditValue(e.target.value)}
                        value={editValue}
                      />
                      <Action>
                        <Button onClick={() => setEditId(0)} type="cancel">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleUpdate(item.id)}
                          type="update">
                          Update
                        </Button>
                      </Action>
                    </>
                  )}
                </Card>
              </Data>
            </TimelineItem>
          ))}
      </TimelineBody>
      <TimelineFooter>
        <Button
          disabled={page === 1 ? true : false}
          onClick={() => handlePage('prev')}
          type="default">
          Prev
        </Button>
        <Button
          disabled={page >= totalPages ? true : false}
          onClick={() => handlePage('next')}
          type="default">
          Next
        </Button>
      </TimelineFooter>
    </Section>
  );
};

export default Timeline;
