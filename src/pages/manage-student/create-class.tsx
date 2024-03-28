import SmallHoverButton from '@/components/Buttons/SmallHoverButton';
import ClassChip from '@/components/ClassChip';
import Nav from '@/components/NavigationBar';
import PageTitle from '@/components/PageTItle';
import SideBar from '@/components/SideBar';
import { FlexColumn, ShadowDiv } from '@/styles/CommonStyles';
import styled from 'styled-components';
import { selectClassData } from '@/mockData';
import { ContentWrapper, Section } from '@/pages/execute-class/select-class';
import { manageClassSidebarContent } from './classlist';
import { COLORS } from '@/styles/palatte';
import Input from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import { useState } from 'react';
import Button from '@/components/Buttons/Button';
import StudentList from '@/components/StudentList';
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

const GRADE = [1, 2, 3, 4, 5, 6];

function createClass() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [className, setClassName] = useState('');
  return (
    <Section2>
      <Nav hasSideBar />
      <SideBar content={manageClassSidebarContent}></SideBar>
      <ContentWrapper2>
        <PageTitle
          title="클래스 만들기"
          desc="학생들을 클래스로 묶어 관리할 수 있습니다."
        />
        <ShadowWrapper>
          <div>
            <StyledText style={{ marginBottom: 10 }}>
              새롭게 생성할 클래스의 이름을 입력하세요.
            </StyledText>
            <Input
              placeholder="EX. 1학년 영어 A분반"
              text={className}
              onChange={(e) => setClassName(e.target.value)}
            ></Input>
          </div>
          <InnerWrapper2>
            <StyledText>클래스가 속하는 학년/반을 선택하세요.</StyledText>
            <Dropdown
              name={'학년'}
              content={GRADE.map((el) => el + '학년')}
              selected={selectedGrade}
              setSelected={setSelectedGrade}
            />
            <Dropdown
              name={'반'}
              content={GRADE.map((el) => el + '반')}
              selected={selectedClass}
              setSelected={setSelectedClass}
            />
          </InnerWrapper2>
          <div>
            <StyledText style={{ marginBottom: 20 }}>
              클래스에 참여 중인 학생 목록을 수정할 수 있습니다.
            </StyledText>
            <ButtonWrapper>
              <Button type="WhiteShadow" text="학생 추가"></Button>
              <Button type="WhiteShadow" text="선택 삭제"></Button>
              <Button
                type="PinkGrad"
                text="일괄 삭제"
                style={{
                  boxShadow: '0rem 0rem 20rem 0rem rgba(0, 0, 0, 0.10)',
                }}
              ></Button>
            </ButtonWrapper>
          </div>
          <StudentList></StudentList>
        </ShadowWrapper>
      </ContentWrapper2>
    </Section2>
  );
}

export default createClass;

const Section2 = styled(Section)`
  width: 100%;
`;

const ContentWrapper2 = styled(ContentWrapper)`
  width: 100%;
  padding-right: 200rem;
`;

const ShadowWrapper = styled(ShadowDiv)`
  padding: 35rem 50rem 25rem 45rem;
  border-radius: 30rem;
  gap: 30rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledText = styled.h5`
  color: ${COLORS.GRAY_66};
  font-size: 18rem;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 23rem;
`;

const InnerWrapper2 = styled.div`
  display: flex;
  align-items: center;
  gap: 15rem;
`;
