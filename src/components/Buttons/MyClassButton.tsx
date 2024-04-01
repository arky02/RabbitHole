import styled from 'styled-components';
import Image from 'next/image';
import Class from '@/public/icon/class.svg';
import { COLORS } from '@/styles/palatte';

function MyClassButton({ className }: { className: string }) {
  return (
    <StyledButton>
      <Image src={Class} alt="class" style={{ marginRight: '11px' }} />
      <StyledText>{className}</StyledText>
    </StyledButton>
  );
}
export default MyClassButton;

const StyledButton = styled.button`
  padding: 23px 16px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid ${COLORS.GRAY_CD};
  background: white;
  display: flex;
  align-items: center;
`;

const StyledText = styled.h5`
  color: #666;
  font-size: 15rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
`;
