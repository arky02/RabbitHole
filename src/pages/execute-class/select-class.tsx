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
import { ClassProp } from '@/server.types';
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

export const selectClassSideBarContent = [
  {
    title: '수업 실행하기',
    options: [
      ['클래스 선택', '/execute-class/select-class'],
      ['실행중인 수업', '/execute-class/class-now-on'],
    ],
  },
];

function selectClass() {
  const { userToken } = useManageUserToken();
  const classInfos = useQuery(getClassInfo(userToken)).data?.data.classes;

  //const handleCreateSession = () => {};

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
                // handleCreateSession(data.class_id);
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
