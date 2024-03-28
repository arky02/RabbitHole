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
import useManageUserToken from '@/hooks/useManageUserToken';
import { useQuery } from '@tanstack/react-query';
import { getClassInfo } from '@/apis/capsuleQuery';
import { ClassProp } from '@/server.types';
import Button from '@/components/Buttons/Button';
import Image from 'next/image';
import Plus from '/public/icon/purplePlus.svg';
import { useRouter } from 'next/router';
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
  const { userToken } = useManageUserToken();
  const classInfos = useQuery(getClassInfo(userToken)).data?.data.classes;

  const router = useRouter();

  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={manageClassSidebarContent}></SideBar>
      <ContentWrapper>
        <PageTitle
          title="담당 클래스"
          desc="직접 구성한 담당 클래스를 관리할 수 있습니다."
        />
        <ButtonWrapper>
          <Button
            type="GrayOutline"
            text="클래스 추가하기"
            style={{ height: 40, padding: '0 20px 0 14px', marginRight: 40 }}
            onClick={() => router.push('/manage-student/create-class')}
          >
            <Image src={Plus} alt="plus" style={{ marginRight: 17 }} />
          </Button>
          <Button
            type="PinkGrad"
            text="선택 복제"
            style={{ height: 40, fontSize: '16px' }}
          />
          <Button
            type="PinkGrad"
            text="선택 삭제"
            style={{ height: 40, fontSize: '16px' }}
          />
        </ButtonWrapper>
        <ClassWrapper>
          {classInfos?.map((data: ClassProp, idx: number) => (
            <ClassChip key={idx} classInfo={data} hasCheckbox></ClassChip>
          ))}
        </ClassWrapper>
      </ContentWrapper>
    </Section>
  );
}

export default manageClassList;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
