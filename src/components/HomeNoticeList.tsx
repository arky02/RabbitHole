import styled from 'styled-components';
import { TimeDescText } from './TodaysClass';
import { FlexColumn } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import { NOTICE } from '@/mockData';

function HomeNoticeList() {
  return (
    <Wrapper>
      {NOTICE.map((data, idx) => (
        <div key={idx}>
          <RowContainer>
            <NoticeTitle>{data[0]}</NoticeTitle>
            <TimeDescText>{data[1]}</TimeDescText>
          </RowContainer>
          <DashedSeparator />
        </div>
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
  font-size: 16rem;
  font-weight: 700;
`;
export const DashedSeparator = styled.div`
  border-bottom: 2px dashed ${COLORS.GRAY_E5};
  margin-left: -15px;
`;
