import Button from '@/components/Buttons/Button';
import styled from 'styled-components';
import Image from 'next/image';
import Recording from '@/public/icon/recording.svg';
import { COLORS } from '@/styles/palatte';
import selectClass, {
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
import { useEffect, useRef, useState } from 'react';
import VideoModal from '@/components/Modals/VideoModal';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Modal from '@/components/Modals/Modal';
import MonitoringVideoList from '@/components/MonitoringVideoList';
import usePrevPath from '@/zustand/usePrevPath';
import MsgBtn from '@/public/icon/messageBtn.svg';
import LessonModal from '@/components/Modals/ChooseLessonModal';
import useManageUserToken from '@/hooks/useManageUserToken';
import { Socket, io } from 'socket.io-client';
import Play from '@/public/icon/play.svg';

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
  const { setPrevPath } = usePrevPath();
  useEffect(() => setPrevPath('수업 실행'), []);
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
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<number>(0);

  return (
    <>
      <ButtonContainer>
        <Button type="GrayOutline" onClick={() => setIsCodeModalOpen(1)}>
          <GrayText>참여코드 불러오기</GrayText>
        </Button>
        <Button type="GrayOutline" onClick={() => setIsCodeModalOpen(2)}>
          <GrayText>단어게임 성적</GrayText>
        </Button>
        <Modal
          isOpen={Boolean(isCodeModalOpen)}
          onCancelClick={() => setIsCodeModalOpen(0)}
          onOkClick={() => setIsCodeModalOpen(0)}
          content={
            isCodeModalOpen === 1
              ? `수업 참여 코드는 ${sessionKey} 입니다.`
              : '개발 중인 기능 입니다.'
          }
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
          {/* <Button
            type="GrayOutline"
            onClick={() =>
              setCheckedVideoList((prev) =>
                prev === videoIdList ? [] : videoIdList,
              )
            }
          >
            <GrayText>전체선택</GrayText>
          </Button> */}
        </ButtonHeader>
        <MonitoringVideoList />
      </VideoListWrapper>
      <FloatingMsgBtn>
        <Image
          src={MsgBtn}
          width={78}
          height={78}
          alt="메세지 보내기 버튼"
        ></Image>
      </FloatingMsgBtn>
    </>
  );
}

function BottomLiveInfoTab() {
  const LessonOptions = [
    '카페에서 음료 주문하기',
    '가판대에서 물건 주문하기',
    '튜토리얼',
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(LessonOptions[0]);
  const [currPlayState, setCurrPlayState] = useState(true);

  const { userToken } = useManageUserToken();

  const socket = useRef<Socket | null>(null);

  if (userToken?.length !== 0 && socket.current == null) {
    socket.current = io('https://api.rabbitholecompany.com/', {
      reconnectionDelayMax: 10000,
      query: {
        token: userToken,
      },
    });

    socket!.current.on('connect', () => {
      console.log('Connected to server');
    });
  }

  const sendLessonToClass = (lessonText: string) => {
    let msg = '';
    switch (lessonText) {
      case '카페에서 음료 주문하기':
        msg = 'cafescene';
        break;
      case '가판대에서 물건 주문하기':
        msg = 'watergungame';
        break;
      case '튜토리얼':
        msg = 'tutorial';
        break;
    }
    socket.current!.emit('send_message_to_class', {
      message: {
        action: 'move_scene',
        params: {
          scene: msg,
        },
      },
    });
  };

  const handlePlayStateChange = ({ isStateStop }: { isStateStop: boolean }) => {
    socket.current!.emit('send_message_to_class', {
      message: {
        action: isStateStop ? 'stop' : currPlayState ? 'play' : 'pause',
        params: {},
      },
    });
  };

  return (
    <LiveInfoTabWrapper>
      <LessonInfoDiv onClick={() => setIsModalOpen(true)}>
        <Image src={Docs} width={17} height={22} alt="수업안" />
        {selectedLesson}
      </LessonInfoDiv>
      <Button
        type="PinkGrad"
        text="전송"
        style={{ height: 40, fontSize: '14rem', marginRight: '45px' }}
        onClick={() => sendLessonToClass(selectedLesson)}
      ></Button>
      <Button
        type="GrayOutline"
        style={{ borderRadius: '10px', width: 40, height: 40 }}
        onClick={() => {
          setCurrPlayState((prev) => !prev);
          handlePlayStateChange({ isStateStop: false });
        }}
      >
        <Image src={currPlayState ? Pause : Play} alt="pause" width={17} />
      </Button>
      <Button
        type="GrayOutline"
        style={{ color: COLORS.RED, height: 38, borderRadius: '10px' }}
        onClick={() => handlePlayStateChange({ isStateStop: true })}
      >
        <StopDiv />
      </Button>
      <LessonModal
        isOpen={isModalOpen}
        onCancelClick={() => setIsModalOpen(false)}
        onOkClick={() => setIsModalOpen(false)}
        setSelectedLesson={setSelectedLesson}
      />
    </LiveInfoTabWrapper>
  );
}

const VideoListWrapper = styled.div`
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15) inset;
  padding: 20px 30px;
  height: 500px;
  overflow-y: auto;
  position: relative;
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
  font-size: 14rem;
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
  font-size: 12rem;
  font-weight: 700;
  color: black;
  gap: 10px;
  padding-left: 14px;
  cursor: pointer;
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
  font-size: 36rem;
  font-weight: 700;
  position: absolute;
  top: 490px;
  left: 550px;
`;

const FloatingMsgBtn = styled.button`
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: 95px;
  bottom: 170px;
`;
