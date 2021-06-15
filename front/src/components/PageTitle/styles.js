// Styled Components
import styled from 'styled-components';

// Pallete
import pallete from '../../theme/pallete';

export const Title = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PrimaryText = styled.h1`
  color: '#000';
  font-size: 24px;
  font-family: 'AvenirBlack';
`;

export const SecondaryText = styled.small`
  color: ${pallete.lightGrey};
  margin-left: 8px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'AvenirRegular';
`;
