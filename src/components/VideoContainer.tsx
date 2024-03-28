import { COLORS } from '@/styles/palatte';
import styled from 'styled-components';
import { StyledCheckbox } from './ClassChip';
import Dots from '/public/icon/dots.svg';
import Image from 'next/image';
import Button from './Buttons/Button';
import Checkbox from './Buttons/Checkbox';
import { Dispatch, SetStateAction, useState } from 'react';

interface VideoContainerProps {
  currState: string;
  isChecked: boolean;
  onCheck: () => void;
  onClick: () => void;
}

function VideoContainer({
  currState = 'playing',
  isChecked,
  onCheck,
  onClick,
}: VideoContainerProps) {
  return (
    <Wrapper onClick={onClick}>
      <TopContainer>
        <Checkbox onClick={onCheck} isChecked={isChecked} />
        {/* <button>
          <Image src={Dots} alt="dots"></Image>
        </button> */}
      </TopContainer>
      {currState !== 'playing' && (
        <StateChip
          type="PinkGrad"
          text={currState.toUpperCase()}
          style={{ position: 'absolute', top: 65, left: 62 }}
        />
      )}
    </Wrapper>
  );
}

export default VideoContainer;

const Wrapper = styled.div`
  border: 1px solid ${COLORS.GRAY_CD};
  border-radius: 20px;
  width: 250px;
  height: 180px;
  position: relative;

  &:hover {
    cursor: pointer;
    background: ${COLORS.MAIN_GRAD};
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const StateChip = styled(Button)`
  cursor: none;
`;
