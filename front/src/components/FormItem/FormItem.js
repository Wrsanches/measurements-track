// React
import React from 'react';

// Styled Components
import { Container, Label, Input, HelpText } from './styles';

// PropTypes
import PropTypes from 'prop-types';

const FormItem = ({ error, helpText, label, name, onChange, value }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        error={error}
        helpText={helpText !== null ? true : false}
        name={name}
        onChange={onChange}
        type="text"
        value={value}
      />
      <HelpText>{helpText}</HelpText>
    </Container>
  );
};

FormItem.propTypes = {
  error: PropTypes.bool,
  helpText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default FormItem;
