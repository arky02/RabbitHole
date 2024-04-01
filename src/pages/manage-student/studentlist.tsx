import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import { FlexColumn, ShadowDiv } from '@/styles/CommonStyles';
import { ContentWrapper, Section } from '@/pages/execute-class/select-class';
import { manageClassSidebarContent } from './classlist';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';
import usePrevPath from '@/zustand/usePrevPath';

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

function manageMyStudentList() {
  // const { setPrevPath } = usePrevPath();
  // setPrevPath('학생 관리');
  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={manageClassSidebarContent}></SideBar>
      <ContentWrapper>
        <PageTitle
          title="전체 학생 관리"
          desc="담당하는 전체 학생 현황을 확인하고 관리합니다."
        />
        <ShadowDiv />
      </ContentWrapper>
    </Section>
  );
}

export default manageMyStudentList;
