import SmallHoverButton from '@/components/Buttons/SmallHoverButton';
import ClassChip from '@/components/ClassChip';
import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import { FlexColumn, ShadowDiv } from '@/styles/CommonStyles';
import styled from 'styled-components';
import { selectClassData } from '@/mockData';
import { ContentWrapper, Section } from '@/pages/executeClass/selectClass';
import { manageClassSidebarContent } from './classList';

function createClass() {
  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={manageClassSidebarContent}></SideBar>
      <ContentWrapper>
        <PageTitle
          title="클래스 만들기"
          desc="학생들을 클래스로 묶어 관리할 수 있습니다."
        />
        <ShadowDiv />
      </ContentWrapper>
    </Section>
  );
}

export default createClass;
