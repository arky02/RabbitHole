import Image from 'next/image';
import styled from 'styled-components';
import RightArrow from '@/public/icon/rightArrow.svg';
import LeftArrow from '@/public/icon/leftArrow.svg';

interface ButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
  style: {};
}

function ArrowButton({ direction, onClick, style }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} style={style}>
      <Image
        src={direction === 'right' ? RightArrow : LeftArrow}
        alt="arrow button"
      ></Image>
    </StyledButton>
  );
}

export default ArrowButton;

const StyledButton = styled.button`
  position: absolute;
  width: 50rem;
  height: 50rem;
  flex-shrink: 0;
  border-radius: 999rem;
  box-shadow: 0rem 0rem 10rem 0rem rgba(16, 16, 16, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
