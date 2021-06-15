// Styled Components
import styled from 'styled-components';

// Pallete
import pallete from '../../../../theme/pallete';

export const TimelineHeader = styled.div``;

export const TimelineBody = styled.div`
  margin-top: 40px;
`;

export const TimelineItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TimelineFooter = styled.div`
  margin-top: 40px;
`;

export const Line = styled.div`
  width: 2px;
  height: 122px;
  border-radius: 10px;
  background-color: ${pallete.darkGrey};
  position: absolute;
`;

export const TimePoint = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50px;
  border: 4px solid ${pallete.secondary};
  background-color: white;
  position: relative;
  left: -6px;
  top: 15px;
`;

export const Data = styled.div`
  margin-top: 16px;
  margin-left: 20px;
`;

export const Date = styled.p`
  color: ${pallete.lightGrey};
  font-size: 12px;
  font-family: 'AvenirRegular';
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 50px;
  padding: 0 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${pallete.grey};
  align-items: center;
  justify-content: space-between;
`;

export const Item = styled.p`
  font-size: 12px;
  font-family: 'AvenirRegular';
`;

export const Action = styled.div``;

export const EditInput = styled.input`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid ${pallete.grey};
`;

export const Button = styled.button`
  width: 70px;
  height: 30px;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'AvenirRegular';

  background-color: ${({ type }) =>
    type === 'default' && pallete.buttons.default};
  background-color: ${({ type }) => type === 'edit' && pallete.buttons.edit};
  background-color: ${({ type }) =>
    type === 'delete' && pallete.buttons.delete};
  background-color: ${({ type }) =>
    type === 'cancel' && pallete.buttons.cancel};
  background-color: ${({ type }) =>
    type === 'update' && pallete.buttons.update};

  ${({ disabled }) =>
    disabled && `background-color: ${pallete.grey}; cursor: default;`}

  &:hover {
    background-color: ${pallete.hover.default};
    ${({ disabled }) => disabled && `background-color: ${pallete.grey};`}
  }

  &:last-child {
    margin-right: 0;
  }
`;
