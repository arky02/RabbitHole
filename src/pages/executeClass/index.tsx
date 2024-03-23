import Nav from '@/components/NavigationBar';
import styled from 'styled-components';
import BookWithPen from '/public/icon/purpleBookWithPen.svg';
import Image from 'next/image';
import { FlexColumn } from '@/styles/CommonStyles';
import PageTitle from '@/components/PageTItle';
import ShortcutMenuChip from '@/components/ShortcutMenuChip';

function executeClass() {
  return (
    <Section>
      <Nav />
      <PageTitle title="수업 실행" margin="0 0 30px" />
      <ShortcutMenuChip
        title="수업 실행하기"
        desc="생성된 클래스를 통해 실제 수업을 진행합니다."
        href="/executeClass/selectClass"
      >
        <Image src={BookWithPen} alt="book"></Image>
      </ShortcutMenuChip>
    </Section>
  );
}

export default executeClass;

const Section = styled(FlexColumn)`
  margin-top: 205px;
  padding: 0 0 0 170px;
`;
