import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../Buttons/Button';
import { FlexColumn, FlexColumnCenterAll } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import defaultProfile from '@/public/icon/defaultProfileImgIcon.svg';
import { DashedSeparator } from '../HomeNoticeList';
import X from '@/public/icon/purpleDelete.svg';
import { ForwardedRef, forwardRef } from 'react';
import { Student } from '../MonitoringVideoList';
import { ModalProps } from '@/client.types';

interface VideoModalProps extends ModalProps {
  studentName: string | null;
}

export default forwardRef(function VideoModal(
  { isOpen = true, onOkClick, onCancelClick, studentName }: VideoModalProps,
  ref: ForwardedRef<HTMLVideoElement>,
) {
  if (typeof document === 'undefined') return;
  const portalDiv = document.querySelector('#modal');
  if (!portalDiv) return null;
  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <StyledModalBackdrop onClick={onCancelClick}></StyledModalBackdrop>
        <StyledModalContainer>
          <TopContainer>
            <Wrapper>
              <Image
                src={defaultProfile}
                width={70}
                height={70}
                alt="profile"
              ></Image>
              <TextWrapper>
                <Name>{`${studentName ?? '-'}`}</Name>
                {/* <Desc>1학년 ㅣ 732801011</Desc> */}
              </TextWrapper>
            </Wrapper>
            <Wrapper>
              <Button
                type="GrayOutline"
                text="소속 클래스 정보"
                style={{
                  fontSize: 14,
                  color: COLORS.GRAY_66,
                  padding: '9px 20px',
                }}
              />
              <button onClick={onCancelClick}>
                <Image src={X} width={25} height={25} alt="close" />
              </button>
            </Wrapper>
          </TopContainer>
          <DashedSeparator2 />
          <Button
            type="GrayOutline"
            text="학생 현재 화면"
            style={{
              fontSize: 14,
              color: COLORS.GRAY_66,
              padding: '9px 20px',
            }}
          ></Button>
          <StyledVideo ref={ref} playsInline autoPlay muted></StyledVideo>
        </StyledModalContainer>
      </div>,
      portalDiv,
    )
  ) : (
    <></>
  );
});

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
  width: 859px;
  height: 610px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2pc 12px 0px rgba(0, 0, 0, 0.08);
  padding: 55px 80px 53px;
  gap: 22px;
`;

const ContentText = styled.h5`
  color: #5b5b5b;
  text-align: center;
  font-size: 18rem;
  font-weight: 700;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TextWrapper = styled(FlexColumn)``;

const Name = styled.h3`
  color: black;
  font-size: 18rem;
  font-weight: 700;
`;

const Desc = styled.h5`
  color: ${COLORS.GRAY_94};
  font-size: 16rem;
  font-weight: 700;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const DashedSeparator2 = styled(DashedSeparator)`
  margin: 0;
  width: 100%;
`;

const StyledVideo = styled.video`
  width: 550px;
  height: auto;
`;
