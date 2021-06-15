// Styled Components
import styled from 'styled-components';

export const Document = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const FirstSection = styled.section`
  width: 45%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const SecondSection = styled.section`
  width: 45%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
