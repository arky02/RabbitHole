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

interface studentType {
  uid: number;
  name: string;
  class_id: number;
  stu_no: number;
  gender: number;
  age: number;
  school_id: number;
  pin: number;
}

function classNowOn() {
  const router = useRouter();
  const { sessionId, key: sessionKey } = router.query;

  const studentList = student.students;

  const { userToken } = useManageUserToken();

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
            style={{ marginBottom: '6rem' }}
            onClick={requestSessionStart}
          />
        </Wrapper>
        <BoldText>접속 학생</BoldText>
        <StudentListWrapper>
          {studentList.map((student: studentType) => (
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
                onClick={() => {}}
                style={{ cursor: 'pointer', marginLeft: '15rem' }}
              />
            </Button>
          ))}
        </StudentListWrapper>
      </ContentWrapper>
    </Section>
  );
}

export default classNowOn;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 36rem;
`;

const InviteCodeDiv = styled(FlexColumnCenterAll)`
  border-radius: 20rem;
  border: 1rem solid #cdcdcd;
  background: #fff;
  width: 763rem;
  height: 193rem;
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
  border-radius: 20rem;
  background: #f7f7f7;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 31rem 35rem;
  gap: 14rem;
`;

const BoldText = styled.h1`
  color: #000;
  font-size: 24rem;
  font-weight: 600;
`;
