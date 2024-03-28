import Button from '@/components/Buttons/Button';
import styled from 'styled-components';
import Image from 'next/image';
import Recording from '/public/icon/recording.svg';
import { COLORS } from '@/styles/palatte';
import {
  ContentWrapper,
  Section,
  selectClassSideBarContent,
} from '@/pages/execute-class/select-class';
import PageTitle from '@/components/PageTItle';
import Nav from '@/components/NavigationBar';
import SideBar from '@/components/SideBar';
import Docs from '/public/icon/docs.svg';
import Pause from '/public/icon/pause.svg';
import VideoContainer from '@/components/VideoContainer';
import { useState } from 'react';
import VideoModal from '@/components/Modals/VideoModal';
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

const videoIdList = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

function LiveClassListSection() {
  return (
    <Section>
      <Nav hasSideBar />
      <SideBar content={selectClassSideBarContent}></SideBar>
      <ContentWrapper2>
        <PageTitle title="실행중인 수업" />
        <VideoListContainer />
        {/* <NoContentText>현재 실행 중인 수업이 없습니다</NoContentText> */}
      </ContentWrapper2>
      <BottomLiveInfoTab />
    </Section>
  );
}

export default LiveClassListSection;

function VideoListContainer() {
  const [checkedVideoList, setCheckedVideoList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ButtonContainer>
        <Button type="GrayOutline">
          <GrayText>참여코드 불러오기</GrayText>
        </Button>
        <Button type="GrayOutline">
          <GrayText>단어게임 성적</GrayText>
        </Button>
      </ButtonContainer>
      <VideoListWrapper>
        <ButtonHeader>
          <Button
            type="GrayOutline"
            forDiv
            style={{
              width: 230,
              justifyContent: 'flex-start',
            }}
          >
            <Image
              src={Recording}
              alt="recording"
              width={32}
              height={32}
            ></Image>
            <span style={{ fontSize: 16, fontWeight: 700 }}>
              1학년 영어 A분반
            </span>
          </Button>
          <Button
            type="GrayOutline"
            onClick={() =>
              setCheckedVideoList((prev) =>
                prev === videoIdList ? [] : videoIdList,
              )
            }
          >
            <GrayText>전체선택</GrayText>
          </Button>
        </ButtonHeader>
        <VideoWrapper>
          {videoIdList.map((videoEl) => (
            <VideoContainer
              currState="paused"
              isChecked={checkedVideoList.includes(videoEl)}
              onCheck={() =>
                setCheckedVideoList((prev) =>
                  prev.includes(videoEl)
                    ? prev.filter((el) => el !== videoEl)
                    : [...prev, videoEl],
                )
              }
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </VideoWrapper>
      </VideoListWrapper>
      <VideoModal
        isOpen={isModalOpen}
        content="dkslfdjsf"
        btnText={['dfsdfsd']}
        onOkClick={() => setIsModalOpen(false)}
        onCancelClick={() => setIsModalOpen(false)}
      ></VideoModal>
    </>
  );
}

function BottomLiveInfoTab() {
  return (
    <LiveInfoTabWrapper>
      <LessonInfoDiv>
        <Image src={Docs} width={17} height={22} alt="수업안" />
        1학년 심화 과정 수업안
      </LessonInfoDiv>
      <Button
        type="PinkGrad"
        text="전송"
        style={{ height: 40, fontSize: '14px', marginRight: '45px' }}
      ></Button>
      <Button type="GrayOutline" style={{ borderRadius: '10px' }}>
        <Image src={Pause} alt="pause" />
      </Button>
      <Button
        type="GrayOutline"
        style={{ color: COLORS.RED, height: 38, borderRadius: '10px' }}
      >
        <StopDiv />
      </Button>
    </LiveInfoTabWrapper>
  );
}

const VideoListWrapper = styled.div`
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15) inset;
  padding: 20px 30px;
  height: 500px;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: -60px;
`;

const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

const ButtonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const GrayText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${COLORS.GRAY_66};
  padding: 5px 13px;
`;

const ContentWrapper2 = styled(ContentWrapper)`
  width: fit-content;
  gap: 25px;
`;

const LiveInfoTabWrapper = styled.div`
  border-top: 1px solid #cdcdcd;
  background-color: white;
  height: 100px;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin-left: 210px;
  display: flex;
  padding: 20px 200px;
  gap: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const LessonInfoDiv = styled.div`
  width: 504px;
  height: 39px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: black;
  gap: 10px;
  padding-left: 14px;
`;

const StopDiv = styled.div`
  background-color: ${COLORS.RED};
  width: 19px;
  height: 20px;
  border-radius: 3px;
`;

const NoContentText = styled.h1`
  color: ${COLORS.GRAY_CD};
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  position: absolute;
  top: 490px;
  left: 550px;
`;
