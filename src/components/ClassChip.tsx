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
  margin-left: ${({ $hasCheckbox }) => ($hasCheckbox ? '18px' : '0px')};
`;

const ButtonWrapper = styled(FlexRowCenterAll)``;

const ShadowWrapper2 = styled.div<{ $hasCheckbox: boolean }>`
  width: 300px;
  display: flex;
  border-radius: 40px;
  background: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 50px 25px 0px 37px;
  height: 175px;
  gap: 30px;
  height: ${({ $hasCheckbox }) => ($hasCheckbox ? '110px' : '160px')};
  padding: 40px 30px 20px 30px;
  ${({ $hasCheckbox }) =>
    $hasCheckbox &&
    'gap:0px align-items: center;  justify-content: flex-start; padding: 0 0 0 25px'}
`;

export const StyledCheckbox = styled.button`
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_CD};
  width: 21px;
  height: 21px;
  margin-right: 15px;
  position: relative;
`;
