import { COLORS } from '@/styles/palatte';
import styled from 'styled-components';
import { StyledCheckbox } from './ClassChip';
import Dots from '@/public/icon/dots.svg';
import Image from 'next/image';
import Button from './Buttons/Button';
import Checkbox from './Buttons/Checkbox';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';

interface VideoContainerProps {
  currState: string;
  isChecked: boolean;
  onCheck: () => void;
  onClick: () => void;
  ref: MutableRefObject<HTMLVideoElement | null | undefined>;
}

function VideoContainer({
  currState = 'playing',
  isChecked,
  onCheck,
  onClick,
  ref,
}: VideoContainerProps) {
  return (
    <Wrapper onClick={onClick} playsInline autoPlay muted>
      <TopContainer>
        <Checkbox onClick={onCheck} isChecked={isChecked} />
        {/* <button>
          <Image src={Dots} alt="dots"></Image>
        </button> */}
      </TopContainer>
      {/* <video ref={ref} playsInline autoPlay muted></video>; */}
      {currState !== 'playing' && (
        <StateChip
          type="PinkGrad"
          text={currState.toUpperCase()}
          style={{ position: 'absolute', top: 65, left: 62, zIndex: 99 }}
        />
      )}
    </Wrapper>
  );
}

export default VideoContainer;

const Wrapper = styled.video`
  border: 1rem solid ${COLORS.GRAY_CD};
  border-radius: 20rem;
  width: 250rem;
  height: 180rem;
  position: relative;

  &:hover {
    cursor: pointer;
    background: ${COLORS.MAIN_GRAD};
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15rem;
  z-index: 99;
`;

const StateChip = styled(Button)`
  cursor: none;
  z-index: 99;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
`;
