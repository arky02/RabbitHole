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

function manageLesson() {
  return (
    <Section>
      <Nav />
      <PageTitle title="수업안 관리" margin="0 0 30rem" />
      <ShortcutMenuChip
        title="수업안 제작"
        desc="저장된 수업을 확인하고 새로운 수업을 구성할 수 있습니다."
        href="/manage-lesson"
      >
        <Image src={BookWithPen} alt="book"></Image>
      </ShortcutMenuChip>
    </Section>
  );
}

export default manageLesson;

const Section = styled(FlexColumn)`
  margin-top: 205rem;
  padding: 0 0 0 170rem;
`;
