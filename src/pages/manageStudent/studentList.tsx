import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import { FlexColumn, ShadowDiv } from '@/styles/CommonStyles';
import { ContentWrapper, Section } from '@/pages/executeClass/selectClass';
import { manageClassSidebarContent } from './classList';

function manageMyStudentList() {
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
