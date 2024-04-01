import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import HomeImg from '@/public/icon/home.svg';

interface ButtonProps {
  type: 'Login' | 'PinkGrad' | 'Options' | 'WhiteShadow' | 'GrayOutline';
  text?: string;
  style?: {};
  children?: ReactNode;
  forDiv?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function Button({
  text = '',
  children,
  onClick,
  type,
  style,
  forDiv = false,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) {
  return type === 'WhiteShadow' ? (
    <StyledButton $type={type} onClick={onClick} style={style} $forDiv={forDiv}>
      {text}
      {children}
    </StyledButton>
  ) : (
    <StyledButton
      $type={type}
      onClick={onClick}
      style={style}
      $forDiv={forDiv}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {text}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{
  $type: 'Login' | 'PinkGrad' | 'Options' | 'WhiteShadow' | 'GrayOutline';
  $forDiv: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.MAIN_GRAD};
  color: ${({ $type }) => ($type === 'GrayOutline' ? 'black' : 'white')};
  font-weight: 700;
  width: fit-content;
  height: fit-content;
  cursor: ${({ $forDiv }) => ($forDiv ? 'default' : 'pointer')};

  ${({ $type }) => {
    if ($type === 'Login')
      return css`
        padding: 10px 15px;
        border-radius: 30px;
        font-size: 20rem;
        width: 100%;
      `;
    else if ($type === 'PinkGrad')
      return css`
        padding: 12px 23px;
        border-radius: 40px;
        font-size: 18rem;
      `;
    else if ($type === 'Options')
      return css`
        padding: 12px 23px;
        border-radius: 40px;
        font-size: 18rem;
        color: ${COLORS.GRAY_97};
        border: 1px solid ${COLORS.GRAY_CD};
        background: #fff;
        &:hover {
          background: ${COLORS.MAIN_GRAD};
          color: white;
          transition: 0.2s ease;
          border: 1px solid white;
          box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
        }
        &:hover img .option-icon {
          fill: white !important;
        }
      `;
    else if ($type === 'WhiteShadow')
      return css`
        padding: 13px 20px;
        border-radius: 30px;
        background: #ffffffd8;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
        color: ${COLORS.GRAY_97};
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(5px);
        z-index: 20;
      `;
    else
      return css`
        border-radius: 30px;
        padding: 6px 9px;
        border: 1px solid ${COLORS.GRAY_CD};
        background: #fff;
        text-align: center;
      `;
  }}
`;
