import SmallHoverButton from '../Buttons/SmallHoverButton';
import bell from '@/public/icon/bell.svg';
import Image from 'next/image';
import useMenuPopup from '@/hooks/useMenuPopup';
import styled from 'styled-components';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

interface ButtonWrapperProps {
  btnRef: MutableRefObject<HTMLButtonElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function StudentAlertPopup() {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useMenuPopup();

  return (
    <div>
      <ButtonWrapper setIsOpen={setIsOpen} btnRef={buttonRef}></ButtonWrapper>
      {isOpen && <PopupWrapper ref={popupRef}></PopupWrapper>}
    </div>
  );
}

export default StudentAlertPopup;

function ButtonWrapper({ btnRef, setIsOpen }: ButtonWrapperProps) {
  return (
    <button ref={btnRef} onClick={() => setIsOpen((prev) => !prev)}>
      <SmallHoverButton style={{ marginRight: '25rem' }} useForDiv>
        <Image src={bell} alt="bell" style={{ marginRight: '6rem' }} />
        학생 알림
      </SmallHoverButton>
    </button>
  );
}

const PopupWrapper = styled.div`
  position: absolute;
  top: 70rem;
  right: 230rem;
  width: 200rem;
  height: 200rem;
  border-radius: 20rem;
  background: white;
  box-shadow: 0rem 0rem 20rem 0rem rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
