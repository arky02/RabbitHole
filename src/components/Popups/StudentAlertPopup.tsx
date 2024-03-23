import SmallHoverButton from '../Buttons/SmallHoverButton'
import bell from '/public/icon/bell.svg'
import Image from 'next/image'
import useMenuPopup from '@/hooks/useMenuPopup'
import styled from 'styled-components'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'

interface ButtonWrapperProps {
  btnRef: MutableRefObject<HTMLButtonElement | null>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function StudentAlertPopup() {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useMenuPopup()

  return (
    <div>
      <ButtonWrapper setIsOpen={setIsOpen} btnRef={buttonRef}></ButtonWrapper>
      {isOpen && <PopupWrapper ref={popupRef}></PopupWrapper>}
    </div>
  )
}

export default StudentAlertPopup

function ButtonWrapper({ btnRef, setIsOpen }: ButtonWrapperProps) {
  return (
    <button ref={btnRef} onClick={() => setIsOpen((prev) => !prev)}>
      <SmallHoverButton style={{ marginRight: '25px' }} useForDiv>
        <Image src={bell} alt="bell" style={{ marginRight: '6px' }} />
        학생 알림
      </SmallHoverButton>
    </button>
  )
}

const PopupWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 230px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;
`
