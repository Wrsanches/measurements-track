// Styled Components
import styled from 'styled-components';

// Pallete
import pallete from '../../theme/pallete';

export const Container = styled.div``;

export const Label = styled.p`
  font-size: 13px;
  margin-bottom: 10px;
  font-family: 'AvenirRegular';
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${({ error }) => (error ? pallete.error : pallete.grey)};

  ${({ helpText }) => helpText && 'margin-bottom: 10px;'}

  &:focus {
    outline: none;
    border: 1px solid ${pallete.focus.input};
  }
`;

export const HelpText = styled.p`
  color: ${pallete.lightGrey};
  font-size: 12px;
  line-height: 15px;
  font-family: 'AvenirRegular';
  margin-bottom: 30px;
`;
