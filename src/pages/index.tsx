import Button from '@/components/Buttons/Button';
import CalendarSection from '@/components/Calendar';
import ClassInfoSection from '@/components/ClassInfoSection';
import HomeNoticeList from '@/components/HomeNoticeList';
import Nav from '@/components/NavigationBar';
import { FlexColumn } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import styled from 'styled-components';
import Backspace from '@/public/icon/forwardArr.svg';
import { useRouter } from 'next/router';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  return !isLoggedIn(await getAccessTokenFromCookie(context))
    ? {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    : {
        props: {},
      };
};

export default function Home() {
  return (
    <Section>
      <Nav />
      <GoToRecentBtn />
      <ClassInfoSection />
      <ColumnSeparator />
      <OtherInfoSection />
    </Section>
  );
}

function GoToRecentBtn() {
  const router = useRouter();
  return (
    <Button
      type="WhiteShadow"
      text="최근 사용 페이지 바로가기"
      style={{ position: 'fixed', top: '186px' }}
      onClick={() => router.back()}
    >
      <Image src={Backspace} alt="back" style={{ marginLeft: '13px' }}></Image>
    </Button>
  );
}

function OtherInfoSection() {
  return (
    <BottomSection>
      <ColumnWrapper>
        <MainText>캘린더</MainText>
        <CalendarWrapper>
          <CalendarSection />
        </CalendarWrapper>
      </ColumnWrapper>
      <RowSeparator />
      <ColumnWrapper>
        <MainText>교사 전체 공지</MainText>
        <HomeNoticeList />
      </ColumnWrapper>
    </BottomSection>
  );
}
const Section = styled.div`
  margin: 50px;
  margin-top: 255px;
`;

const BottomSection = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const ColumnWrapper = styled(FlexColumn)`
  width: 100%;
`;

const ColumnSeparator = styled.div`
  border-bottom: 2px solid ${COLORS.GRAY_E5};
  margin-top: 19px;
  margin-bottom: 25px;
`;
const RowSeparator = styled.div`
  border-left: 1px solid ${COLORS.GRAY_E5};
  margin: 0 40px 0 49px;
  height: 450px;
`;

const MainText = styled.h1`
  color: #161616;
  font-size: 32px;
  margin-bottom: 25px;
  font-weight: 700;
`;

const CalendarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
