import SmallHoverButton from '@/components/Buttons/SmallHoverButton';
import Nav from '@/components/NavigationBar';
import SideBar from '@/components/SideBar';
import {
  ContentWrapper,
  Section,
  selectClassSideBarContent,
} from '@/pages/execute-class/select-class';
import { student } from '@/mockData';
import Button from '@/components/Buttons/Button';
import PageTitle from '@/components/PageTItle';
import styled from 'styled-components';
import { FlexColumnCenterAll } from '@/styles/CommonStyles';
import Del from '@/public/icon/purpleDelete.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';
import { request } from '@/apis/axios';
import toast from 'react-hot-toast';
import useManageUserToken from '@/hooks/useManageUserToken';
import {
  QueryCache,
  QueryClient,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getStudentInSession } from '@/apis/capsuleQuery';
import { studentListRes } from '@/server.types';
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

function classNowOn() {
  const { setPrevPath } = usePrevPath();

  const queryClient = useQueryClient();
  const router = useRouter();
  const { sessionId, key: sessionKey } = router.query;

  const { userToken } = useManageUserToken();

  const studentsInSession = useQuery(
    getStudentInSession(userToken, Number(sessionId)),
  ).data?.data.students;

  const requestSessionStart = async () => {
    try {
      const res = await request.post(
        'change_session_status',
        {
          session_id: Number(sessionId),
          new_status: 'started',
        },
        { headers: { Authorization: `Bearer ${userToken}` } },
      );

      // response status 200
      toast.success('수업 세션 시작');
      router.push(
        `/execute-class/live-classlist/${sessionId}?key=${sessionKey}`,
      );
    } catch (error) {
      toast.error(
        '수업 세션을 시작하는 도중 문제가 발생하였습니다. 관리자에게 문의하세요',
      );
      console.log(error);
    }
  };

  const removeStudentFromSession = async (studentId: number) => {
    try {
      const res = await request.delete('remove_student_from_session', {
        data: {
          // delete req body
          session_id: sessionId,
          student_id: studentId,
        },
        headers: { Authorization: `Bearer ${userToken}` },
      });

      // response status 200
      toast.success('성공적으로 학생을 세션에서 제거하였습니다.');
      queryClient.invalidateQueries({
        queryKey: ['sessionStudent', Number(sessionId)],
      });
    } catch (error) {
      toast.error(
        '세션에서 학생을 제거하는데 문제가 발생하였습니다. 관리자에게 문의하세요.',
      );
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
          title="실행중인 수업"
          desc="현재 실행중인 수업 현황을 한 눈에 보고 관리할 수 있습니다."
        />
        <Wrapper>
          <InviteCodeDiv>
            <InfoText>학생 참여 코드가 발행되었습니다.</InfoText>
            <CodeText>{sessionKey}</CodeText>
          </InviteCodeDiv>
          <Button
            type="PinkGrad"
            text="수업 시작하기"
            style={{ marginBottom: '6px' }}
            onClick={requestSessionStart}
          />
        </Wrapper>
        {/* <BoldText>접속 학생</BoldText>
        <StudentListWrapper>
          {studentsInSession?.length !== 0 ? (
            studentsInSession?.map((student: studentListRes) => (
              <Button
                type="WhiteShadow"
                text={student.stu_no + '  ' + student.name}
                forDiv
                key={student.uid}
              >
                <Image
                  src={Del}
                  width={16}
                  height={16}
                  alt="delete"
                  onClick={() => {
                    removeStudentFromSession(student.uid);
                  }}
                  style={{ cursor: 'pointer', marginLeft: '15px' }}
                />
              </Button>
            ))
          ) : (
            <span>접속한 학생이 없습니다.</span>
          )}
        </StudentListWrapper> */}
      </ContentWrapper>
    </Section>
  );
}

export default classNowOn;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 36px;
`;

const InviteCodeDiv = styled(FlexColumnCenterAll)`
  border-radius: 20px;
  border: 1px solid #cdcdcd;
  background: #fff;
  width: 763px;
  height: 193px;
  justify-content: space-evenly;
  flex-shrink: 0;
`;

const InfoText = styled.h2`
  color: black;
  text-align: center;
  font-size: 24rem;
  font-weight: 700;
`;

const CodeText = styled.h1`
  color: #353535;
  text-align: center;
  font-size: 64rem;
  font-weight: 800;
`;

const StudentListWrapper = styled.div`
  border-radius: 20px;
  background: #f7f7f7;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 31px 35px;
  gap: 14px;
`;

const BoldText = styled.h1`
  color: #000;
  font-size: 24rem;
  font-weight: 600;
`;
