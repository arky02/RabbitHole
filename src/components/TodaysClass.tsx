import { FlexColumn } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import styled from 'styled-components';
import Stroke from '@/public/icon/strokeSeparator.svg';
import Image from 'next/image';

function TodaysClass() {
  return (
    <Wrapper>
      <LeftContainer>
        <ClassTimeText>1교시</ClassTimeText>
        <TimeDescText>00:00 - 00:00</TimeDescText>
      </LeftContainer>
      <Image src={Stroke} alt="separator" />
      <ClassNameText>1학년 A분반 - 영어</ClassNameText>
    </Wrapper>
  );
}

export default TodaysClass;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14rem;
  padding: 15rem 22rem;
  border-radius: 15rem;
  border: 1rem solid ${COLORS.GRAY_CD};
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
`;

export const TimeDescText = styled.h5`
  color: ${COLORS.GRAY_CD};
  font-size: 15rem;
  font-weight: 700;
`;

const LeftContainer = styled(FlexColumn)``;
