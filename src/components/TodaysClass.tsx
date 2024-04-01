import { FlexColumn } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import styled from 'styled-components';
import Stroke from '@/public/icon/strokeSeparator.svg';
import Image from 'next/image';

function TodaysClass() {
  return (
    <Wrapper>
      <LeftContainer>
        <ClassTimeText>-</ClassTimeText>
        <TimeDescText>00:00 - 00:00</TimeDescText>
      </LeftContainer>
      <Image src={Stroke} alt="separator" />
      <ClassNameText>-</ClassNameText>
    </Wrapper>
  );
}

export default TodaysClass;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 22px;
  border-radius: 15px;
  border: 1px solid ${COLORS.GRAY_CD};
  background: #fff;
`;

const ClassTimeText = styled.h1`
  color: black;
  font-size: 24rem;
  font-weight: 700;
`;

const ClassNameText = styled.h3`
  color: black;
  font-size: 20rem;
  font-weight: 700;
  width: 170px;
  text-align: center;
`;

export const TimeDescText = styled.h5`
  color: ${COLORS.GRAY_CD};
  font-size: 15rem;
  font-weight: 700;
`;

const LeftContainer = styled(FlexColumn)``;
