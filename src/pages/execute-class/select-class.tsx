import SmallHoverButton from '@/components/Buttons/SmallHoverButton';
import { useQuery } from '@tanstack/react-query';
import ClassChip from '@/components/ClassChip';
import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import { FlexColumn } from '@/styles/CommonStyles';
import styled from 'styled-components';
import useManageUserToken from '@/hooks/useManageUserToken';
import { getClassInfo } from '@/apis/capsuleQuery';
import { ClassProp, createSessionRes } from '@/server.types';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';
import toast from 'react-hot-toast';
import { request } from '@/apis/axios';
import { useRouter } from 'next/router';
import usePrevPath from '@/zustand/usePrevPath';
import { useEffect } from 'react';

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

export const selectClassSideBarContent = [
  {
    title: '수업 실행하기',
    options: [['클래스 선택', '/execute-class/select-class']],
  },
];

function selectClass() {
  const { setPrevPath } = usePrevPath();
  const { userToken } = useManageUserToken();
  const classInfos = useQuery(getClassInfo(userToken)).data?.data.classes;
  const router = useRouter();

  const handleCreateSession = async (classId: number) => {
    try {
      const res: createSessionRes = await request.post(
        'create_session',
        {
          class_id: classId,
        },
        { headers: { Authorization: `Bearer ${userToken}` } },
      );

      if (res.status === 201) {
        toast.success('수업 세션 생성 완료');
        router.push(
          `/execute-class/class-now-on/${res.data.session_id}?key=${res.data.session_key}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => setPrevPath('수업 실행'), []);

  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={selectClassSideBarContent}></SideBar>
      <ContentWrapper>
        <PageTitle
          title="클래스 선택"
          desc="수업을 실행할 클래스를 선택합니다."
        />
        <ClassWrapper>
          {classInfos?.map((data: ClassProp) => (
            <ClassChip
              key={data.class_id}
              classInfo={data}
              onClick={() => {
                handleCreateSession(data.class_id);
              }}
            ></ClassChip>
          ))}
        </ClassWrapper>
      </ContentWrapper>
    </Section>
  );
}

export default selectClass;

export const Section = styled.div`
  display: flex;
`;

export const ContentWrapper = styled(FlexColumn)`
  margin: 220px 0px 0px 268px;
  gap: 30px;
`;

export const ClassWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
