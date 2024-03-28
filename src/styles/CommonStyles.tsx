import styled from 'styled-components';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexColumnCenterAll = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
`;

export const FlexRowCenterAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShadowDiv = styled.div`
  box-shadow: 0rem 0rem 10rem 0rem rgba(0, 0, 0, 0.1);
  width: fit-content;
  height: fit-content;
`;

export const Border20GrayD9Div = styled.div`
  border-radius: 20rem;
  border: 1rem solid #d9d9d9;
  background: #fff;
`;
