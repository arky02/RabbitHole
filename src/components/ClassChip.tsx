import Image from 'next/image';
import { ShadowWrapper } from './ShortcutMenuChip';
import Class from '/public/icon/class.svg';
import styled from 'styled-components';
import PlayBtn from '/public/image/playBtn.png';
import { FlexColumn, FlexRowCenterAll } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';

interface ClassProp {
  school_id: number;
  class_no: number;
  grade: number;
  year: number;
  className: string;
}
function ClassChip({
  classInfo,
  hasCheckbox = false,
}: {
  classInfo: ClassProp;
  hasCheckbox?: boolean;
}) {
  return (
    <ShadowWrapper2 href="/">
      {hasCheckbox && <StyledCheckbox type="checkbox" />}
      <Image src={Class} width={66} height={43} alt="class"></Image>
      <ColumnWrapper>
        <ClassName>{classInfo.className}</ClassName>
        <ButtonWrapper>
          <GrayText>실행하러 가기</GrayText>
          <button>
            <Image src={PlayBtn} width={50} height={50} alt="play"></Image>
          </button>
        </ButtonWrapper>
      </ColumnWrapper>
    </ShadowWrapper2>
  );
}

export default ClassChip;

const ClassName = styled.h2`
  color: #000;
  font-size: 18px;
  font-weight: 700;
`;

const GrayText = styled.h3`
  color: #666;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
`;

const ColumnWrapper = styled(FlexColumn)`
  justify-content: space-between;
`;

const ButtonWrapper = styled(FlexRowCenterAll)``;

const ShadowWrapper2 = styled(ShadowWrapper)`
  width: 300px;
  height: 160px;
  padding: 40px 30px 20px 30px;
`;

const StyledCheckbox = styled.input`
  border-radius: 20px;
  border-color: ${COLORS.GRAY_CD};
  border-width: 1px;
`;
