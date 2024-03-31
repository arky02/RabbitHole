import Button from '@/components/Buttons/Button';
import styled from 'styled-components';
import Image from 'next/image';
import Recording from '@/public/icon/recording.svg';
import { COLORS } from '@/styles/palatte';
import {
  ContentWrapper,
  Section,
  selectClassSideBarContent,
} from '@/pages/execute-class/select-class';
import PageTitle from '@/components/PageTItle';
import Nav from '@/components/NavigationBar';
import SideBar from '@/components/SideBar';
import Docs from '@/public/icon/docs.svg';
import Pause from '@/public/icon/pause.svg';
import VideoContainer from '@/components/VideoContainer';
import { useState } from 'react';
import VideoModal from '@/components/Modals/VideoModal';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Modal from '@/components/Modals/Modal';
import MonitoringVideoList from '@/components/MonitoringVideoList';

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
  const router = useRouter();
  const { sessionId, key: sessionKey } = router.query;

  const [checkedVideoList, setCheckedVideoList] = useState<string[]>([]);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  return (
    <>
      <ButtonContainer>
        <Button type="GrayOutline" onClick={() => setIsCodeModalOpen(true)}>
          <GrayText>참여코드 불러오기</GrayText>
        </Button>
        <Button type="GrayOutline">
          <GrayText>단어게임 성적</GrayText>
        </Button>
        <Modal
          isOpen={isCodeModalOpen}
          onCancelClick={() => setIsCodeModalOpen(false)}
          onOkClick={() => setIsCodeModalOpen(false)}
          content={`수업 참여 코드는 ${sessionKey} 입니다.`}
          btnText={['확인']}
        ></Modal>
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
        <MonitoringVideoList />
        {/* <VideoWrapper>
          {videoIdList.map((videoEl, idx) => (
            <VideoContainer
              key={idx}
              currState="paused"
              isChecked={checkedVideoList.includes(videoEl)}
              onCheck={() =>
                setCheckedVideoList((prev) =>
                  prev.includes(videoEl)
                    ? prev.filter((el) => el !== videoEl)
                    : [...prev, videoEl],
                )
              }
              onClick={() => setIsVideoModalOpen(true)}
            />
          ))}
        </VideoWrapper> */}
      </VideoListWrapper>
    </>
  );
}

function BottomLiveInfoTab() {
  const [isLessonPopupOpen, setIsLessonPopupOpen] = useState(false);
  return (
    <LiveInfoTabWrapper>
      <LessonInfoDiv onClick={() => setIsLessonPopupOpen(true)}>
        <Image src={Docs} width={17} height={22} alt="수업안" />
        1학년 심화 과정 수업안
      </LessonInfoDiv>
      <Button
        type="PinkGrad"
        text="전송"
        style={{ height: 40, fontSize: '14rem', marginRight: '45rem' }}
      ></Button>
      <Button type="GrayOutline" style={{ borderRadius: '10rem' }}>
        <Image src={Pause} alt="pause" />
      </Button>
      <Button
        type="GrayOutline"
        style={{ color: COLORS.RED, height: 38, borderRadius: '10rem' }}
      >
        <StopDiv />
      </Button>
      <Modal
        content="전송할 수업안 고르는 모달"
        btnText={['확인']}
        isOpen={isLessonPopupOpen}
        onCancelClick={() => setIsLessonPopupOpen(false)}
        onOkClick={() => {
          setIsLessonPopupOpen(false);
        }}
      ></Modal>
    </LiveInfoTabWrapper>
  );
}

const VideoListWrapper = styled.div`
  border-radius: 30rem;
  background: #fff;
  box-shadow: 0rem 0rem 10rem 0rem rgba(0, 0, 0, 0.15) inset;
  padding: 20rem 30rem;
  height: 500rem;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12rem;
  justify-content: flex-end;
  margin-top: -60rem;
`;

const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rem;
`;

const ButtonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rem;
`;

const GrayText = styled.span`
  font-size: 14rem;
  font-weight: 700;
  color: ${COLORS.GRAY_66};
  padding: 5rem 13rem;
`;

const ContentWrapper2 = styled(ContentWrapper)`
  width: fit-content;
  gap: 25rem;
`;

const LiveInfoTabWrapper = styled.div`
  border-top: 1rem solid #cdcdcd;
  background-color: white;
  height: 100rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin-left: 210rem;
  display: flex;
  padding: 20rem 200rem;
  gap: 15rem;
  box-shadow: 0rem 0rem 10rem 0rem rgba(0, 0, 0, 0.1);
`;

const LessonInfoDiv = styled.div`
  width: 504rem;
  height: 39rem;
  flex-shrink: 0;
  border-radius: 10rem;
  border: 1rem solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  font-size: 12rem;
  font-weight: 700;
  color: black;
  gap: 10rem;
  padding-left: 14rem;
  cursor: pointer;
`;

const StopDiv = styled.div`
  background-color: ${COLORS.RED};
  width: 19rem;
  height: 20rem;
  border-radius: 3rem;
`;

const NoContentText = styled.h1`
  color: ${COLORS.GRAY_CD};
  text-align: center;
  font-size: 36rem;
  font-weight: 700;
  position: absolute;
  top: 490rem;
  left: 550rem;
`;
