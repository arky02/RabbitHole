import Image from 'next/image';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Logo from '/public/icon/logo.svg';
import SmallHoverButton from './Buttons/SmallHoverButton';
import School from '/public/icon/purpleSchool.svg';
import { FlexColumnCenterAll } from '@/styles/CommonStyles';
import { useRouter } from 'next/router';
import Crowd from '/public/icon/purpleCrowd.svg';

interface SideBarProps {
  content: {
    title: string;
    options: string[][];
  }[];
}
function SideBar({ content }: SideBarProps) {
  const router = useRouter();
  return (
    <Wrapper>
      <Image
        src={Logo}
        alt="logo"
        width={128}
        height={89}
        style={{ marginBottom: 55 }}
        onClick={() => router.push('/')}
      />
      <OptionContents content={content} />
    </Wrapper>
  );
}

export default SideBar;

function OptionContents({ content }: SideBarProps) {
  const router = useRouter();

  return (
    <>
      {content.map((optionContent, index) => (
        <ContentWrapper key={index}>
          <TitleWrapper>
            <Image
              src={optionContent.title === '클래스 관리' ? Crowd : School}
              alt="school"
              height={17}
            ></Image>
            <OptionTitle>{optionContent.title}</OptionTitle>
          </TitleWrapper>
          {optionContent.options.map((option, idx) => (
            <SmallHoverButton
              key={idx}
              style={{ marginBottom: '3px' }}
              onClick={() => router.push(option[1])}
            >
              {option[0]}
            </SmallHoverButton>
          ))}
        </ContentWrapper>
      ))}
    </>
  );
}

const Wrapper = styled.div`
  box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 80px 40px;
  height: 100vh;
  z-index: 100;
  position: fixed;
  background-color: white;
`;

const ContentWrapper = styled(FlexColumnCenterAll)`
  margin-bottom: 40px;
`;

const OptionTitle = styled.h5`
  font-size: 16px;
  font-weight: 700;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 8px;
`;
