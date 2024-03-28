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
import Del from '/public/icon/purpleDelete.svg';
import Image from 'next/image';
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
  const studentList = student.students;
  const router = useRouter();
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
            <CodeText>011228</CodeText>
          </InviteCodeDiv>
          <Button
            type="PinkGrad"
            text="수업 시작하기"
            style={{ marginBottom: '6px' }}
            onClick={() => router.push('/execute-class/live-classlist')}
          />
        </Wrapper>
        <BoldText>접속 학생</BoldText>
        <StudentListWrapper>
          {studentList.map((student: studentType) => (
            <Button
              type="WhiteShadow"
              text={student.stu_no + '  ' + student.name}
              forDiv
            >
              <Image
                src={Del}
                width={16}
                height={16}
                alt="delete"
                onClick={() => {}}
                style={{ cursor: 'pointer', marginLeft: '15px' }}
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
  font-size: 24px;
  font-weight: 700;
`;

const CodeText = styled.h1`
  color: #353535;
  text-align: center;
  font-size: 64px;
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
  font-size: 24px;
  font-weight: 600;
`;
