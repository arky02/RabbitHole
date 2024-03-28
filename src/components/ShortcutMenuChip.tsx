import { FlexColumn } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface MenuChipProps {
  children: ReactNode;
  title: string;
  desc: string;
  href: string;
}

function ShortcutMenuChip({ children, title, desc, href }: MenuChipProps) {
  return (
    <ShadowWrapper href={href}>
      {children}
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{desc}</Description>
      </TextWrapper>
    </ShadowWrapper>
  );
}

export default ShortcutMenuChip;

export const ShadowWrapper = styled(Link)`
  display: flex;
  border-radius: 40rem;
  background: white;
  box-shadow: 0rem 4rem 10rem 0rem rgba(0, 0, 0, 0.1);
  padding: 50rem 25rem 0rem 37rem;
  width: 300rem;
  height: 175rem;
  gap: 30rem;
`;

const TextWrapper = styled(FlexColumn)`
  gap: 12rem;
  margin-top: -15rem;
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
`;
