// Styled Components
import styled from 'styled-components';

// Pallete
import pallete from '../../theme/pallete';

export const Button = styled.button`
  color: #fff;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 30px;
  margin-top: 20px;
  font-family: 'AvenirRegular';
  cursor: pointer;
  background-color: black;

  &:hover {
    background-color: ${pallete.hover.button};
  }
`;
