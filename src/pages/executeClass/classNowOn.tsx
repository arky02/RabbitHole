import SmallHoverButton from '@/components/Buttons/SmallHoverButton';
import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import styled from 'styled-components';
import {
  ContentWrapper,
  Section,
  selectClassSideBarContent,
} from '@/pages/executeClass/selectClass';

function classNowOn() {
  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={selectClassSideBarContent}></SideBar>
      <ContentWrapper>
        <PageTitle
          title="실행중인 수업"
          desc="현재 실행중인 수업 현황을 한 눈에 보고 관리할 수 있습니다."
        />
      </ContentWrapper>
    </Section>
  );
}

export default classNowOn;
