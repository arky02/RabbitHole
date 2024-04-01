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
import Modal from '@/components/Modals/Modal';
import { useEffect, useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
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
      <Modal
        content="구현 중인 페이지입니다."
        btnText={['확인']}
        isOpen={isModalOpen}
        onCancelClick={() => setIsModalOpen(false)}
        onOkClick={() => setIsModalOpen(false)}
      ></Modal>
    </Section>
  );
}

export default manageMyStudentList;
