import styled from 'styled-components';
import Separator from '/public/icon/separator.svg';
import Image from 'next/image';
import DefaultProfile from '/public/icon/defaultProfileImgIcon.svg';
import { COLORS } from '@/styles/palatte';
import school from '/public/icon/school.svg';
import Button from './Buttons/Button';
import {
  FlexColumn,
  FlexColumnCenterAll,
  ShadowDiv,
} from '@/styles/CommonStyles';
import MyClassButton from './Buttons/MyClassButton';
import ArrowButton from './Buttons/ArrowButton';
import TodaysClass from './TodaysClass';

function ClassInfoSection() {
  return (
    <ShadowBox>
      <LeftContainer>
        <ProfileContainer>
          <Image
            src={DefaultProfile}
            width={184}
            height={184}
            alt="default profile"
          />
          <ProfileWrapper>
            <NameAndSchoolWrapper>
              <NameText>홍길동</NameText>
              <SchoolText>
                <Image
                  src={school}
                  alt="school"
                  style={{ marginRight: '6px' }}
                />
                OO초등학교
              </SchoolText>
            </NameAndSchoolWrapper>
            <MailText>hong0000@gmail.com</MailText>
          </ProfileWrapper>
        </ProfileContainer>

        <MyClassContainer>
          <TextContainer>
            <TitleText>나의 담당 클래스</TitleText>
            <Button type="SmallGray" text="클래스 관리 페이지로 이동" />
          </TextContainer>
          <ClassListContainer>
            <MyClassButton className="1학년 영어 A분반"></MyClassButton>
            <MyClassButton className="1학년 영어 A분반"></MyClassButton>
            <MyClassButton className="1학년 영어 A분반"></MyClassButton>
            <MyClassButton className="1학년 영어 A분반"></MyClassButton>
          </ClassListContainer>
          <ArrowButton
            direction="right"
            onClick={() => {}}
            style={{ top: '70px', right: '-45px' }}
          ></ArrowButton>
          <ArrowButton
            direction="left"
            onClick={() => {}}
            style={{ top: '70px', left: '-45px' }}
          ></ArrowButton>
        </MyClassContainer>
      </LeftContainer>
      <RowSeparator />
      <RightContainer>
        <TitleContainer>
          <TitleText>오늘의 수업</TitleText>
          <CurrTimeIndicator> 2024.00.00 목 00:00</CurrTimeIndicator>
        </TitleContainer>
        <ClassContainer>
          <TodaysClass></TodaysClass>
          <TodaysClass></TodaysClass>
          <TodaysClass></TodaysClass>
        </ClassContainer>
      </RightContainer>
    </ShadowBox>
  );
}

export default ClassInfoSection;

const ShadowBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
  height: fit-content;
`;
const LeftContainer = styled(FlexColumn)`
  padding: 35px 72px 53px 60px;
  justify-content: center;
  gap: 38px;
`;

const RightContainer = styled(FlexColumn)`
  padding: 35px 40px 0 15px;
  height: 100%;
  gap: 16px;
`;

const MyClassContainer = styled(FlexColumn)`
  gap: 21px;
  position: relative;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const ProfileWrapper = styled(FlexColumn)`
  gap: 12px;
  margin-top: 20px;
`;

const NameAndSchoolWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const NameText = styled.h1`
  color: black;
  font-size: 36px;
  font-weight: 700;
`;

const SchoolText = styled.span`
  color: ${COLORS.GRAY_97};
  font-size: 20px;
  font-weight: 700;
`;

const MailText = styled.h4`
  color: ${COLORS.GRAY_97};
  font-size: 16px;
  font-weight: 600;
`;

const TitleText = styled.h1`
  color: black;
  font-size: 28px;
  font-weight: 700;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const ClassListContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const ClassContainer = styled(FlexColumnCenterAll)`
  gap: 10px;
`;

const CurrTimeIndicator = styled(ShadowDiv)`
  border-radius: 30px;
  background: #fff;
  color: #666;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  padding: 8px 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const RowSeparator = styled.div`
  border-left: 2px solid ${COLORS.GRAY_E5};
  height: 400px;
  margin-top: 25px;
  margin-left: 15px;
`;