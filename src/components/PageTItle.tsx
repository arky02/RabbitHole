import styled from 'styled-components';
import { TitleText } from './NavigationBar';
import Book from '@/public/icon/purpleBook.svg';
import BookWithPen from '@/public/icon/purpleBookWithPen.svg';
import Home from '@/public/icon/purpleHome.svg';
import Person from '@/public/icon/purplePerson.svg';
import Image from 'next/image';
import { FlexColumn } from '@/styles/CommonStyles';

interface TitleProps {
  title: string;
  desc?: string;
  margin?: string;
}

function PageTitle({ title, desc, margin = '0' }: TitleProps) {
  return (
    <Wrapper $margin={margin}>
      <TitleWrapper>
        {title === '수업안 관리' && <Image src={Book} alt="icon"></Image>}
        {title === '수업 실행' && <Image src={BookWithPen} alt="icon"></Image>}
        {title === '교사 홈' && <Image src={Home} alt="icon"></Image>}
        {title === '학생 관리' && <Image src={Person} alt="icon"></Image>}
        <TitleText>{title}</TitleText>
      </TitleWrapper>
      {desc && <DescText>{desc}</DescText>}
    </Wrapper>
  );
}

export default PageTitle;

const Wrapper = styled(FlexColumn)<{ $margin: string }>`
  margin: ${({ $margin }) => $margin};
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const DescText = styled.h5`
  color: #c86fff;
  font-size: 18rem;
  font-weight: 700;
  margin-top: 15px;
`;
