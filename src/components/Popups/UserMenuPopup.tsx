import Image from 'next/image';
import styled, { keyframes, css } from 'styled-components';
import DefaultProfile from '@/public/icon/defaultProfileImgIcon.svg';
import DropdownTriBtn from '@/public/icon/downTriArrow.svg';
import CloseDropdownTriBtn from '@/public/icon/upTriArrow.svg';
import useMenuPopup from '@/hooks/useMenuPopup';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { COLORS } from '@/styles/palatte';
import { FlexColumn } from '@/styles/CommonStyles';
import SmallHoverButton from '../Buttons/SmallHoverButton';
import { useRouter } from 'next/router';
import useManageUserToken from '@/hooks/useManageUserToken';

interface MenuProps {
  userName: string;
  userProfileImg?: string;
}

interface DropdownBtnProps {
  btnRef: MutableRefObject<HTMLButtonElement | null>;
  userName: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface PopupMenuProps {
  popupRef: MutableRefObject<HTMLDivElement | null>;
  btnRef: MutableRefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const fadeInDropdown = keyframes`
    0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
`;

const fadeOutDropdown = keyframes`
    0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
`;

function UserMenuPopup({ userName, userProfileImg = '' }: MenuProps) {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useMenuPopup();

  return (
    <>
      <MenuDropdownBtn
        userName={userName}
        btnRef={buttonRef}
        setIsOpen={setIsOpen}
      />
      <PopupMenu
        popupRef={popupRef}
        isOpen={isOpen}
        btnRef={buttonRef}
        setIsOpen={setIsOpen}
      ></PopupMenu>
    </>
  );
}

export default UserMenuPopup;

function PopupMenu({ popupRef, btnRef, isOpen, setIsOpen }: PopupMenuProps) {
  const router = useRouter();
  const { removeToken } = useManageUserToken();

  const handleLogout = () => {
    removeToken({ redirectUri: '/login' });
  };

  return (
    isOpen && (
      <div style={{ position: 'relative' }}>
        <PopupMenuWrapper ref={popupRef} $isOpen={isOpen}>
          <ProfileInfoWrapper>
            <Image
              src={DefaultProfile}
              width={70}
              height={70}
              alt="user profile"
            ></Image>
            <FlexColumn>
              <Name>홍길동</Name>
              <Description>교사</Description>
              <Description>hong00@gmail.com</Description>
            </FlexColumn>
          </ProfileInfoWrapper>
          <OptionsMenuWrapper>
            <OptionWrapper>
              <Description>옵션</Description>
              <Option>도움말</Option>
              <Option onClick={() => router.push('/')}>
                교사 홈으로 돌아가기
              </Option>
            </OptionWrapper>
            <OptionWrapper>
              <Description>내 계정</Description>
              <Option>기본정보 변경하기</Option>
              <Option onClick={() => handleLogout()}>로그아웃</Option>
            </OptionWrapper>
          </OptionsMenuWrapper>
          <CloseBtnWrapper>
            <SmallHoverButton
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              ref={btnRef}
            >
              <span style={{ fontSize: '14px' }}>창 닫기</span>
              <Image
                src={CloseDropdownTriBtn}
                alt="close dropdown button"
                style={{ marginLeft: '7px' }}
              ></Image>
            </SmallHoverButton>
          </CloseBtnWrapper>
        </PopupMenuWrapper>
      </div>
    )
  );
}

const PopupMenuWrapper = styled.div<{ $isOpen: boolean }>`
  padding: 33px 65px 33px 40px;
  height: 410px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 45px;
  right: 0;
  z-index: 10;
  /* animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${fadeInDropdown} 0.4s ease
        `
      : css`
          ${fadeOutDropdown} 0.4s ease
        `}; */
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 40px;
`;

const Name = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 7px;
`;

const Description = styled.h5`
  color: ${COLORS.GRAY_97};
  font-size: 12px;
  font-weight: 700;
`;

const OptionsMenuWrapper = styled(FlexColumn)`
  gap: 50px;
`;

const OptionWrapper = styled(FlexColumn)`
  gap: 7px;
  align-items: flex-start;
`;

const Option = styled.button`
  font-weight: 500;
  padding-inline-start: 0;
`;

const CloseBtnWrapper = styled.div`
  position: absolute;
  right: 20px;
  bottom: 16px;
`;

function MenuDropdownBtn({ userName, btnRef, setIsOpen }: DropdownBtnProps) {
  return (
    <DropdownWrapper>
      {userName}
      <Image
        src={DefaultProfile}
        alt="user profile"
        style={{ margin: '0 10px 0 6px' }}
        width={30}
        height={30}
      ></Image>
      <button
        ref={btnRef}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <Image src={DropdownTriBtn} alt="dropdown button"></Image>
      </button>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  padding: 11px 19px;
  display: flex;
  align-items: center;
  height: 46px;
  flex-shrink: 0;
  border-radius: 30px;
  font-weight: 500;
  background: #fff;
  box-shadow: 0px 0px 13.4px 1px rgba(0, 0, 0, 0.1);
`;
