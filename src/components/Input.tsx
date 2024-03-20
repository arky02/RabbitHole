import { useState } from 'react'
import styled from 'styled-components'

interface InputProps {
  placeholder?: string
}

function Input({ placeholder }: InputProps) {
  const [text, setText] = useState('')
  return (
    <InputStyleWrapper
      onChange={(e) => setText(e.target.value)}
      value={text}
      placeholder={placeholder}
    />
  )
}

export default Input

const InputStyleWrapper = styled.input`
  display: flex;
  width: 350px;
  height: 50px;
  padding: 0px 35px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #e4e4e4;
  border: none;
  font-size: 16px;
`
