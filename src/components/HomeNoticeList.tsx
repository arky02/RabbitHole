import styled from 'styled-components';
import { TimeDescText } from './TodaysClass';
import { FlexColumn } from '@/styles/CommonStyles';
import Image from 'next/image';
import Separator from '@/public/icon/rowStrokeSeparator.svg';
import { COLORS } from '@/styles/palatte';

const mockData = [
  ['OOOO 시험 운영 공지', '2024.XX.XX'],
  ['desfsdfsf', '2024.XX.XX'],
  ['OOOO 시험 운영 공지', '2024.XX.XX'],
  ['desfsdfsf', '2024.XX.XX'],
  ['OOOO 시험 운영 공지', '2024.XX.XX'],
];

function HomeNoticeList() {
  return (
    <Wrapper>
      {mockData.map((data, idx) => (
        <>
          <RowContainer key={idx}>
            <NoticeTitle>{data[0]}</NoticeTitle>
            <TimeDescText>{data[1]}</TimeDescText>
          </RowContainer>
          <DashedSeparator />
        </>
      ))}
    </Wrapper>
  );
}
export default HomeNoticeList;

const Wrapper = styled(FlexColumn)``;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 14px 0;
`;
const NoticeTitle = styled.h2`
  color: #666;
  font-size: 16px;
  font-weight: 700;
`;
export const DashedSeparator = styled.div`
  border-bottom: 2px dashed ${COLORS.GRAY_E5};
  margin-left: -15px;
`;
