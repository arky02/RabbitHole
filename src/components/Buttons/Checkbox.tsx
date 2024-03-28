import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import Checked from '@/public/icon/checked.svg';

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
  border-radius: 4rem;
  border: 1rem solid ${COLORS.GRAY_CD};
  width: 21rem;
  height: 21rem;
  margin-right: 15rem;
  background-color: white;
  position: relative;
`;
