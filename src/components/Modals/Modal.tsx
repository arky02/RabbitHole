import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../Buttons/Button';
import { FlexColumnCenterAll } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import { ModalProps } from './VideoModal';

interface Props extends ModalProps {
  isOpen: boolean;
  content: string;
  btnText: string[];
  onOkClick: () => void;
  onCancelClick: () => void;
}

function Modal({
  isOpen = true,
  content,
  btnText,
  onOkClick,
  onCancelClick,
}: Props) {
  if (typeof document === 'undefined') return;
  const portalDiv = document.querySelector('#modal');
  if (!portalDiv) return null;
  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <StyledModalBackdrop onClick={onCancelClick}></StyledModalBackdrop>
        <StyledModalContainer>
          <ContentText>{content}</ContentText>
          {btnText.map((text) => (
            <Button
              type="GrayOutline"
              style={{ padding: '10rem 20rem', color: COLORS.GRAY_66 }}
              onClick={onOkClick}
            >
              {text}
            </Button>
          ))}
        </StyledModalContainer>
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

const StyledModalContainer = styled(FlexColumnCenterAll)`
  width: 500rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  border-radius: 20rem;
  box-shadow: 0 2pc 12rem 0rem rgba(0, 0, 0, 0.08);
  padding: 55rem 80rem 45rem;
  gap: 25rem;
`;

const ContentText = styled.h5`
  color: #5b5b5b;
  text-align: center;
  font-size: 18rem;
  font-weight: 700;
`;
