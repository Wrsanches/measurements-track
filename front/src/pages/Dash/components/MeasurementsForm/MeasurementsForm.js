// React
import React, { useState } from 'react';

// Global Components
import { Section, FormItem } from '../../../../components';

// Styled Components
import { Button } from './styles';

// Redux
import { useSelector } from 'react-redux';

// GraphQL
import { ADD_MEASUREMENT } from '../../../../graphql/mutations';

// Apollo
import { useMutation } from '@apollo/client';

const MeasurementsForm = () => {
  const [formState, setFormState] = useState({
    values: { weight: '', date: '' },
    error: false
  });

  const userId = useSelector((state) => parseInt(state.auth.id));

  const [addMeasurement] = useMutation(ADD_MEASUREMENT);

  const handleChange = (event) => {
    event.preventDefault();
    setFormState((formState) => ({
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      }
    }));
  };

  const handleSubmit = () => {
    if (
      Object.keys(formState.values).length === 0 ||
      formState.values.weight === '' ||
      formState.values.date === ''
    ) {
      setFormState({ ...formState, error: true });
    } else {
      addMeasurement({
        variables: {
          weight: parseFloat(formState.values.weight),
          date: new Date(formState.values.date),
          userId
        }
      });

      setFormState({
        ...formState,
        values: { weight: '', date: '' },
        error: false
      });
    }
  };

  return (
    <Section>
      <FormItem
        error={formState.error}
        helpText="E.g. 80 or 80.5 or 80.49"
        label="Weight"
        name="weight"
        onChange={handleChange}
        value={formState.values.weight}
      />
      <FormItem
        error={formState.error}
        helpText="E.g. 2021-01-01 10:00:00"
        label="Date"
        name="date"
        onChange={handleChange}
        value={formState.values.date}
      />
      <Button onClick={() => handleSubmit()}>New</Button>
    </Section>
  );
};

export default MeasurementsForm;
