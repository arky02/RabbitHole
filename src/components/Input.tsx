import { COLORS } from '@/styles/palatte';
import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder?: string;
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function Input({ placeholder, text, onChange }: InputProps) {
  return (
    <InputStyleWrapper
      onChange={onChange}
      value={text}
      placeholder={placeholder}
    />
  );
}

export default Input;

const InputStyleWrapper = styled.input`
  display: flex;
  width: 350px;
  height: 50px;
  padding: 0px 35px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f7f7f7;
  border: none;
  font-size: 16px;
`;
