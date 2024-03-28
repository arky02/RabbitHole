import styled from 'styled-components';
import Image from 'next/image';
import UserMenuPopup from './Popups/UserMenuPopup';
import LogoImg from '@/public/icon/logo.svg';
import Button from './Buttons/Button';
import Backspace from '@/public/icon/backspace.svg';
import Newspaper from '@/public/icon/newspaper.svg';
import Book from '@/public/icon/book.svg';
import BookWithPen from '@/public/icon/bookwithpencil.svg';
import Setting from '@/public/icon/setting.svg';
import Person from '@/public/icon/person.svg';
import HomeBtnImg from '@/public/icon/homeBtn.svg';
import StudentAlertPopup from './Popups/StudentAlertPopup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageTitle from './PageTItle';
import { useState } from 'react';
import WhiteBook from '@/public/icon/whiteBook.svg';
import WhiteNewspaper from '@/public/icon/whiteNewspaper.svg';
import WhiteBookWithPen from '@/public/icon/whiteBookwithpencil.svg';
import WhiteSetting from '@/public/icon/whiteSetting.svg';
import WhitePerson from '@/public/icon/whitePerson.svg';

function Nav({ hasSideBar = false }: { hasSideBar?: boolean }) {
  const router = useRouter();
  const currPath = router.pathname;

  return (
    <ColumnWrapper $hasSideBar={hasSideBar}>
      <TopWrapper>
        <StudentAlertPopup />
        <UserMenuPopup userName="홍길동 (교사)" />
      </TopWrapper>
      <BottomMenuContainer currPath={currPath} hasSideBar={hasSideBar} />
    </ColumnWrapper>
  );
}

export default Nav;

function BottomMenuContainer({
  currPath,
  hasSideBar,
}: {
  currPath: string;
  hasSideBar: boolean;
}) {
  return currPath === '/' ? (
    <MenuOptionsWrapper>
      <Link href={'/'}>
        <Image src={LogoImg} width={128} height={85} alt="logo" />
      </Link>
      <PageTitle title="교사 홈" margin="0 0 0 70rem" />
      <OptionButtons isHomePage />
    </MenuOptionsWrapper>
  ) : (
    <MenuOptionsWrapper>
      {!hasSideBar && (
        <Link href={'/'}>
          <Image src={LogoImg} width={128} height={85} alt="logo" />
        </Link>
      )}
      <OptionButtons hasSideBar={hasSideBar} />
      <HomeBtn hasSideBar={hasSideBar} />
    </MenuOptionsWrapper>
  );
}

function OptionButtons({
  isHomePage = false,
  hasSideBar = false,
}: {
  isHomePage?: boolean;
  hasSideBar?: boolean;
}) {
  const router = useRouter();
  const [isBtnHovered, setIsBtnHovered] = useState([0, 0, 0, 0, 0]);

  return (
    <ButtonWrapper $hasSideBar={hasSideBar}>
      {isHomePage || (
        <Button
          type="PinkGrad"
          text={'이전 페이지'}
          style={{
            marginRight: '30rem',
            boxShadow: '0rem 0rem 17.1rem 0rem rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => router.back()}
        >
          <Image
            src={Backspace}
            alt="돌아가기"
            style={{ marginRight: '15rem' }}
          ></Image>
        </Button>
      )}
      <Button
        type="Options"
        text="수업안 관리"
        onClick={() => router.push('/manage-lesson')}
        onMouseEnter={() => setIsBtnHovered([1, 0, 0, 0, 0])}
        onMouseLeave={() => setIsBtnHovered([0, 0, 0, 0, 0])}
      >
        <Image
          src={isBtnHovered[0] ? WhiteBook : Book}
          alt="book"
          style={{ marginRight: '10rem' }}
        />
      </Button>
      <Button
        type="Options"
        text="수업 실행"
        onClick={() => router.push('/execute-class')}
        onMouseEnter={() => setIsBtnHovered([0, 1, 0, 0, 0])}
        onMouseLeave={() => setIsBtnHovered([0, 0, 0, 0, 0])}
      >
        <Image
          src={isBtnHovered[1] ? WhiteBookWithPen : BookWithPen}
          alt="book"
          style={{ marginRight: '10rem' }}
        />
      </Button>
      <Button
        type="Options"
        text="성적 관리"
        onMouseEnter={() => setIsBtnHovered([0, 0, 1, 0, 0])}
        onMouseLeave={() => setIsBtnHovered([0, 0, 0, 0, 0])}
      >
        <Image
          src={isBtnHovered[2] ? WhiteNewspaper : Newspaper}
          alt="newspaper"
          style={{ marginRight: '10rem' }}
        />
      </Button>
      <Button
        type="Options"
        text="학생 관리"
        onClick={() => router.push('/manage-student')}
        onMouseEnter={() => setIsBtnHovered([0, 0, 0, 1, 0])}
        onMouseLeave={() => setIsBtnHovered([0, 0, 0, 0, 0])}
      >
        <Image
          src={isBtnHovered[3] ? WhitePerson : Person}
          alt="profile"
          style={{ marginRight: '10rem' }}
        />
      </Button>
      <Button
        type="Options"
        text="기타 설정"
        onMouseEnter={() => setIsBtnHovered([0, 0, 0, 0, 1])}
        onMouseLeave={() => setIsBtnHovered([0, 0, 0, 0, 0])}
      >
        <Image
          src={isBtnHovered[4] ? WhiteSetting : Setting}
          alt="setting"
          style={{ marginRight: '10rem' }}
        />
      </Button>
    </ButtonWrapper>
  );
}

function HomeBtn({ hasSideBar = false }: { hasSideBar?: boolean }) {
  return (
    <Link href={'/'}>
      <Image
        src={HomeBtnImg}
        alt="home"
        style={{
          position: 'absolute',
          right: 35,
          top: hasSideBar ? 0 : 35,
          cursor: 'pointer',
        }}
      ></Image>
    </Link>
  );
}

const ColumnWrapper = styled.div<{ $hasSideBar: boolean }>`
  width: 100%;
  height: 165rem;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $hasSideBar }) =>
    $hasSideBar ? '0rem' : '0rem 1rem 10rem 0rem rgba(0, 0, 0, 0.1)'};
  margin-left: ${({ $hasSideBar }) => ($hasSideBar ? '5rem' : 0)};
  position: fixed;
  inset: 0;
  background: #ffffffea;
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(5rem);
  z-index: 10;
  justify-content: ${({ $hasSideBar }) =>
    $hasSideBar ? 'space-between' : 'flex-start'};
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 15rem;
  margin-right: 24rem;
`;

const MenuOptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding: 0 32rem;
  align-items: flex-end;
  position: relative;
`;

const ButtonWrapper = styled.div<{ $hasSideBar: boolean }>`
  display: flex;
  gap: 14rem;
  align-items: flex-end;
  margin-left: ${({ $hasSideBar }) => ($hasSideBar ? '210rem' : '70rem')};
`;

export const TitleText = styled.h1`
  color: black;
  font-size: 40rem;
  font-weight: 700;
  white-space: nowrap;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11rem;
  margin-left: 70rem;
`;
