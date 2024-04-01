import { FlexColumn } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface MenuChipProps {
  children: ReactNode;
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
}

function ShortcutMenuChip({
  children,
  title,
  desc,
  href = '',
  onClick = () => {},
}: MenuChipProps) {
  const router = useRouter();
  return (
    <ShadowWrapper onClick={href ? () => router.push(href) : onClick}>
      {children}
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{desc}</Description>
      </TextWrapper>
    </ShadowWrapper>
  );
}

export default ShortcutMenuChip;

export const ShadowWrapper = styled.button`
  display: flex;
  border-radius: 40px;
  background: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 50px 25px 0px 37px;
  width: 300px;
  height: 175px;
  gap: 30px;
`;

const TextWrapper = styled(FlexColumn)`
  gap: 12px;
  margin-top: -15px;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: black;
  font-size: 24rem;
  font-weight: 700;
`;

const Description = styled.h5`
  color: ${COLORS.GRAY_94};
  font-size: 14rem;
  font-weight: 600;
  line-height: 150%;
  text-align: start;
  width: 166px;
`;
