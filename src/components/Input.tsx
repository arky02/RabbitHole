import { COLORS } from '@/styles/palatte';
import Image from 'next/image';
import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import EyeOn from '@/public/icon/eyeOn.svg';
import EyeOff from '@/public/icon/eyeOff.svg';

interface InputProps {
  placeholder?: string;
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isPassword?: boolean;
}

function Input({
  placeholder,
  text,
  onChange,
  isPassword = false,
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <InputWrapper>
      <InputStyleWrapper
        onChange={onChange}
        value={text}
        placeholder={placeholder}
        type={!isVisible && isPassword ? 'password' : 'text'}
        autoComplete="off"
      />
      {isPassword && (
        <StyledEyeButton onClick={handleVisibility} type="button">
          <Image
            src={isVisible ? EyeOn : EyeOff}
            width={20}
            height={20}
            alt="비밀번호 숨기기"
          ></Image>
        </StyledEyeButton>
      )}
    </InputWrapper>
  );
}

export default Input;

const InputWrapper = styled.div`
  position: relative;
`;

const InputStyleWrapper = styled.input`
  display: flex;
  width: 350rem;
  height: 50rem;
  padding: 0rem 35rem;
  align-items: center;
  gap: 10rem;
  flex-shrink: 0;
  border-radius: 20rem;
  background: #f7f7f7;
  border: none;
  font-size: 16rem;
`;

const StyledEyeButton = styled.button`
  position: absolute;
  right: 15rem;
  top: 13rem;
  border: none;
  background: none;
`;
