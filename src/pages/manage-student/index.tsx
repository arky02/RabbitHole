import Nav from '@/components/NavigationBar';
import styled from 'styled-components';
import BookWithPen from '/public/icon/purpleBookWithPen.svg';
import Image from 'next/image';
import { FlexColumn } from '@/styles/CommonStyles';
import PageTitle from '@/components/PageTItle';
import ShortcutMenuChip from '@/components/ShortcutMenuChip';
import Person from '/public/icon/purplePerson.svg';
import Crowd from '/public/icon/purpleCrowd.svg';

function manageStudent() {
  return (
    <Section>
      <Nav />
      <PageTitle title="학생 관리" margin="0 0 30px" />
      <MenuContainer>
        <ShortcutMenuChip
          title="클래스 관리"
          desc="학생들을 클래스로 구성해 관리합니다."
          href="/manage-student/classlist"
        >
          <Image src={Crowd} alt="book"></Image>
        </ShortcutMenuChip>
        <ShortcutMenuChip
          title="전체 학생 관리"
          desc="담당하는 전체 학생 현황을 확인하고 관리합니다."
          href="/manage-student/studentlist"
        >
          <Image src={BookWithPen} alt="book"></Image>
        </ShortcutMenuChip>
      </MenuContainer>
    </Section>
  );
}

export default manageStudent;

const Section = styled(FlexColumn)`
  margin-top: 205px;
  padding: 0 0 0 170px;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 25px;
`;
