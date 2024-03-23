import Image from 'next/image'
import styled from 'styled-components'
import RightArrow from '/public/icon/rightArrow.svg'
import LeftArrow from '/public/icon/leftArrow.svg'

interface ButtonProps {
  onClick: () => void
  direction: 'left' | 'right'
  style: {}
}

function ArrowButton({ direction, onClick, style }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} style={style}>
      <Image
        src={direction === 'right' ? RightArrow : LeftArrow}
        alt="arrow button"
      ></Image>
    </StyledButton>
  )
}

export default ArrowButton

const StyledButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 999px;
  box-shadow: 0px 0px 10px 0px rgba(16, 16, 16, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`
