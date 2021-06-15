// React
import React from 'react';

// Styled Components
import { Container } from './styles';

// External Packages
import PropTypes from 'prop-types';

const Section = ({ children }) => {
  return <Container>{children}</Container>;
};

Section.propTypes = {
  children: PropTypes.element
};

export default Section;
