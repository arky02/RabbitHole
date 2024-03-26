import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import Checked from '/public/icon/checked.svg';

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}
function Checkbox({ isChecked, onClick }: CheckboxProps) {
  return (
    <StyledCheckbox onClick={onClick}>
      {isChecked && (
        <Image
          src={Checked}
          width={19}
          height={19}
          alt="checked"
          style={{ position: 'absolute', top: 0, left: 0 }}
        ></Image>
      )}
    </StyledCheckbox>
  );
}
export default Checkbox;

export const StyledCheckbox = styled.button`
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_CD};
  width: 21px;
  height: 21px;
  margin-right: 15px;
  position: relative;
`;
