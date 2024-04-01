import { COLORS } from '@/styles/palatte';
import { MutableRefObject, ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ref?: MutableRefObject<HTMLButtonElement | null> | null;
  style?: {};
  useForDiv?: boolean;
}
function SmallHoverButton({
  children,
  onClick,
  ref = null,
  style,
  useForDiv,
}: ButtonProps) {
  return useForDiv ? (
    <StyledButtonDiv style={style}>{children}</StyledButtonDiv>
  ) : (
    <StyledButton onClick={onClick} ref={ref} style={style}>
      {children}
    </StyledButton>
  );
}
export default SmallHoverButton;

const StyledButton = styled.button`
  color: ${COLORS.GRAY_97};
  font-weight: 700;
  display: flex;
  align-items: center;
  height: fit-content;
  border-radius: 5px;
  padding: 5.5px 15px 5.5px 10px;
  &:hover {
    background: ${COLORS.GRAY_D9};
    color: #666;
    transition: 0.5s;
  }
`;

const StyledButtonDiv = styled.div`
  color: ${COLORS.GRAY_97};
  font-weight: 700;
  display: flex;
  align-items: center;
  height: fit-content;
  border-radius: 5px;
  padding: 5.5px 15px 5.5px 10px;
  &:hover {
    background: ${COLORS.GRAY_D9};
    color: #666;
    transition: 0.3s;
  }
`;
