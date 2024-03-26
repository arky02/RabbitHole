import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
}

function Modal({ isOpen = true }: ModalProps) {
  if (typeof document === 'undefined') return;
  const portalDiv = document.querySelector('#modal');
  if (!portalDiv) return null;
  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <StyledModalBackdrop></StyledModalBackdrop>
        <StyledModalContainer></StyledModalContainer>
      </div>,
      portalDiv,
    )
  ) : (
    <></>
  );
}

export default Modal;

const StyledModalBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 900;
`;

const StyledModalContainer = styled.div`
  width: 500px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2pc 12px 0px rgba(0, 0, 0, 0.08);
  padding: 32px 28px;
`;
