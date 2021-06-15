// Styled Components
import styled from 'styled-components';

// Pallete
import pallete from '../../../../theme/pallete';

export const Button = styled.button`
  color: ${pallete.text.primary};
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${pallete.buttons.default};
  font-family: 'AvenirRegular';

  &:hover {
    background-color: ${pallete.hover.primary};
  }
`;
