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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  width: fit-content;
  height: fit-content;
`;
