// Styled Components
import styled from 'styled-components';

// Pallete
import pallete from '../../theme/pallete';

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  width: 360px;
  height: 330px;
  padding: 0 20px;
`;

export const Label = styled.label`
  display: block;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: 'AvenirBlack';
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid ${({ error }) => (error ? pallete.error : pallete.grey)};
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 0 10px;
  font-family: 'AvenirRegular';

  &:focus {
    outline: none;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;
