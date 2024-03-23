import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import HomeImg from '/public/icon/home.svg';

interface ButtonProps {
  type: 'Login' | 'GoBack' | 'Options' | 'WhiteShadow' | 'SmallGray';
  text: string;
  style?: {};
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ text, children, onClick, type, style }: ButtonProps) {
  return type === 'WhiteShadow' ? (
    <StyledButton $type={type} onClick={onClick} style={style}>
      {text}
      {children}
    </StyledButton>
  ) : (
    <StyledButton $type={type} onClick={onClick} style={style}>
      {children}
      {text}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{
  $type: 'Login' | 'GoBack' | 'Options' | 'WhiteShadow' | 'SmallGray';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--button-border);
  background: ${COLORS.MAIN_GRAD};
  color: white;
  font-weight: 700;
  width: fit-content;
  height: fit-content;

  ${({ $type }) => {
    if ($type === 'Login')
      return css`
        padding: 10px 15px;
        border-radius: 30px;
        font-size: 20px;
        width: 100%;
      `;
    else if ($type === 'GoBack')
      return css`
        padding: 12px 23px;
        border-radius: 40px;
        font-size: 18px;
        box-shadow: 0px 0px 17.1px 0px rgba(0, 0, 0, 0.1);
      `;
    else if ($type === 'Options')
      return css`
        padding: 12px 23px;
        border-radius: 40px;
        font-size: 18px;
        color: ${COLORS.GRAY_97};
        border: 1px solid ${COLORS.GRAY_CD};
        background: #fff;
        &:hover {
          background: ${COLORS.MAIN_GRAD};
          color: white;
          transition: 0.5s ease;
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
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
        color: ${COLORS.GRAY_97};
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(5px);
        z-index: 999;
      `;
    else
      return css`
        border-radius: 30px;
        padding: 6px 9px;
        border: 1px solid ${COLORS.GRAY_CD};
        background: #fff;
        color: #666;
        text-align: center;
        font-size: 11px;
        font-weight: 700;
      `;
  }}
`;
