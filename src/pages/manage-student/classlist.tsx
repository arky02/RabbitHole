import SmallHoverButton from '@/components/Buttons/SmallHoverButton';
import ClassChip from '@/components/ClassChip';
import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import { selectClassData } from '@/mockData';
import { FlexColumn } from '@/styles/CommonStyles';
import styled from 'styled-components';
import {
  ClassWrapper,
  ContentWrapper,
  Section,
} from '@/pages/execute-class/select-class';

export const manageClassSidebarContent = [
  {
    title: '클래스 관리',
    options: [
      ['담당 클래스', '/manage-student/classlist'],
      ['클래스 만들기', '/manage-student/create-class'],
    ],
  },
  {
    title: '전체 학생 관리',
    options: [['전체 학생 관리', '/manage-student/studentlist']],
  },
];

function manageClassList() {
  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={manageClassSidebarContent}></SideBar>
      <ContentWrapper>
        <PageTitle
          title="담당 클래스"
          desc="직접 구성한 담당 클래스를 관리할 수 있습니다."
        />
        <ClassWrapper>
          {selectClassData.map((data, idx) => (
            <ClassChip key={idx} classInfo={data}></ClassChip>
          ))}
        </ClassWrapper>
      </ContentWrapper>
    </Section>
  );
}

export default manageClassList;
