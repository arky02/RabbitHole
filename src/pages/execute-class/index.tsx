import Nav from '@/components/NavigationBar';
import styled from 'styled-components';
import BookWithPen from '@/public/icon/purpleBookWithPen.svg';
import Image from 'next/image';
import { FlexColumn } from '@/styles/CommonStyles';
import PageTitle from '@/components/PageTItle';
import ShortcutMenuChip from '@/components/ShortcutMenuChip';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';

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

function executeClass() {
  return (
    <Section>
      <Nav />
      <PageTitle title="수업 실행" margin="0 0 30rem" />
      <ShortcutMenuChip
        title="수업 실행하기"
        desc="생성된 클래스를 통해 실제 수업을 진행합니다."
        href="/execute-class/select-class"
      >
        <Image src={BookWithPen} alt="book"></Image>
      </ShortcutMenuChip>
    </Section>
  );
}

export default executeClass;

const Section = styled(FlexColumn)`
  margin-top: 205rem;
  padding: 0 0 0 170rem;
`;
