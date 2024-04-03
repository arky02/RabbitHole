import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../Buttons/Button';
import {
  FlexColumn,
  FlexColumnCenterAll,
  FlexRowCenterAll,
} from '@/styles/CommonStyles';
import { ModalProps } from '@/client.types';
import Dropdown from '../Dropdown';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Class from '@/public/icon/class.svg';
import Image from 'next/image';
import Close from '@/public/icon/purpleDelete.svg';
import { Socket, io } from 'socket.io-client';
import useManageUserToken from '@/hooks/useManageUserToken';

const GRADE = [1, 2, 3, 4, 5, 6];

interface Props extends ModalProps {
  isOpen: boolean;
  setSelectedLesson: Dispatch<SetStateAction<string>>;
  onOkClick: () => void;
  onCancelClick: () => void;
}

function LessonModal({
  isOpen = true,
  onOkClick,
  onCancelClick,
  setSelectedLesson,
}: Props) {
  const [grade, setGrade] = useState('');
  const [order, setOrder] = useState('');

  const LessonOptions = [
    '카페에서 음료 주문하기',
    '가판대에서 물건 주문하기',
    '튜토리얼',
  ];

  const { userToken } = useManageUserToken();

  // const socket = useRef<Socket | null>(null);

  // socket.current = io('https://api.rabbitholecompany.com/', {
  //   reconnectionDelayMax: 10000,
  //   query: {
  //     token: userToken,
  //   },
  // });

  // socket.current.on('connect', () => {
  //   console.log('Connected to server');
  // });

  if (typeof document === 'undefined') return;
  const portalDiv = document.querySelector('#modal');
  if (!portalDiv) return null;
  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <StyledModalBackdrop onClick={onCancelClick}></StyledModalBackdrop>
        <StyledModalContainer>
          <DropdownContainer>
            <FlexRowCenterAll style={{ gap: 7 }}>
              <Text>정렬</Text>
              <Dropdown
                name={'학년'}
                content={GRADE.map((el) => el + '학년')}
                selected={grade}
                setSelected={setGrade}
              />
              <Dropdown
                name={'순서'}
                content={['최신순', '오래된순', '이름순']}
                selected={order}
                setSelected={setOrder}
              />
            </FlexRowCenterAll>
            <button onClick={onCancelClick}>
              <Image src={Close} width={26} height={26} alt="close"></Image>
            </button>
          </DropdownContainer>
          <OptionWrapper>
            {LessonOptions.map((lesson) => (
              <LessonOption
                onClick={() => {
                  setSelectedLesson(lesson);
                  onCancelClick();
                }}
                name={lesson}
              ></LessonOption>
            ))}
          </OptionWrapper>
        </StyledModalContainer>
      </div>,
      portalDiv,
    )
  ) : (
    <></>
  );
}

const LessonOption = ({
  onClick,
  name,
}: {
  onClick: () => void;
  name: string;
}) => {
  return (
    <LessonOptionWrapper>
      <FlexRowCenterAll>
        <Image src={Class} alt="class" width={22} height={18}></Image>
        <NameText>{name}</NameText>
      </FlexRowCenterAll>
      <FlexRowCenterAll>
        <DescText>최종 수정 2024.01.01 13:00</DescText>
        <Button
          type="PinkGrad"
          text="선택"
          style={{ width: 60, height: 25 }}
          onClick={onClick}
        ></Button>
      </FlexRowCenterAll>
    </LessonOptionWrapper>
  );
};

export default LessonModal;

const StyledModalBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 900;
`;

const StyledModalContainer = styled(FlexColumn)`
  width: 1243px;
  height: 706px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2pc 12px 0px rgba(0, 0, 0, 0.08);
  padding: 29px 27px 45px;
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;
`;

const Text = styled.h5`
  color: #666;
  font-size: 14px;
  font-weight: 700;
  margin-right: 20px;
  margin-left: 15px;
`;

const LessonOptionWrapper = styled.div`
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  width: 1192px;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 24px;
  justify-content: space-between;
`;

const NameText = styled.h5`
  color: #000;
  font-size: 16px;
  font-weight: 700;
  margin-left: 104px;
`;

const DescText = styled.h5`
  color: #949494;
  font-size: 11px;
  font-weight: 700;
  margin-right: 240px;
`;

const OptionWrapper = styled(FlexColumn)`
  gap: 16px;
`;
