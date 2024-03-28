import Image from 'next/image';
import Class from '@/public/icon/class.svg';
import styled from 'styled-components';
import PlayBtn from '@/public/image/playBtn.png';
import { FlexColumn, FlexRowCenterAll } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import { useState } from 'react';
import Checked from '@/public/icon/checked.svg';
import Checkbox from './Buttons/Checkbox';
import { ClassProp } from '@/server.types';

function ClassChip({
  classInfo,
  hasCheckbox = false,
  onClick,
}: {
  classInfo: ClassProp;
  hasCheckbox?: boolean;
  onClick?: () => void;
}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ShadowWrapper2 $hasCheckbox={hasCheckbox}>
      {hasCheckbox && (
        <Checkbox
          onClick={() => setIsChecked((prev) => !prev)}
          isChecked={isChecked}
        />
      )}
      <Image
        src={Class}
        width={hasCheckbox ? 57 : 66}
        height={hasCheckbox ? 37 : 43}
        alt="class"
      ></Image>
      <ColumnWrapper $hasCheckbox={hasCheckbox}>
        <ClassName $hasCheckbox={hasCheckbox}>
          {classInfo.class_name ?? ''}
        </ClassName>
        {!hasCheckbox ? (
          <ButtonWrapper>
            <GrayText $hasCheckbox={hasCheckbox}>실행하러 가기</GrayText>
            <button onClick={onClick}>
              <Image src={PlayBtn} width={50} height={50} alt="play"></Image>
            </button>
          </ButtonWrapper>
        ) : (
          <GrayText $hasCheckbox={hasCheckbox}>실행하러 가기</GrayText>
        )}
      </ColumnWrapper>
    </ShadowWrapper2>
  );
}

export default ClassChip;

const ClassName = styled.h2<{ $hasCheckbox: boolean }>`
  color: #000;
  font-size: ${({ $hasCheckbox }) => ($hasCheckbox ? '16rem' : '18rem')};
  font-weight: 700;
`;

const GrayText = styled.h3<{ $hasCheckbox: boolean }>`
  color: #666;
  font-size: ${({ $hasCheckbox }) => ($hasCheckbox ? '11rem' : '15rem')};
  font-weight: 700;
  white-space: nowrap;
`;

const ColumnWrapper = styled(FlexColumn)<{ $hasCheckbox: boolean }>`
  justify-content: ${({ $hasCheckbox }) =>
    $hasCheckbox ? 'flex-start ' : 'space-between'};
  margin-left: ${({ $hasCheckbox }) => ($hasCheckbox ? '18rem' : '0rem')};
`;

const ButtonWrapper = styled(FlexRowCenterAll)``;

const ShadowWrapper2 = styled.div<{ $hasCheckbox: boolean }>`
  width: 300rem;
  display: flex;
  border-radius: 40rem;
  background: white;
  box-shadow: 0rem 4rem 10rem 0rem rgba(0, 0, 0, 0.1);
  padding: 50rem 25rem 0rem 37rem;
  height: 175rem;
  gap: 30rem;
  height: ${({ $hasCheckbox }) => ($hasCheckbox ? '110rem' : '160rem')};
  padding: 40rem 30rem 20rem 30rem;
  ${({ $hasCheckbox }) =>
    $hasCheckbox &&
    'gap:0rem; align-items: center;  justify-content: flex-start; padding: 0 0 0 25rem;'}
`;

export const StyledCheckbox = styled.button`
  border-radius: 4rem;
  border: 1rem solid ${COLORS.GRAY_CD};
  width: 21rem;
  height: 21rem;
  margin-right: 15rem;
  position: relative;
`;
