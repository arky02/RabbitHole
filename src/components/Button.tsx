import { MouseEventHandler, ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps {
  type: 'Login' | 'GoBack' | 'Options'
  text: string
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({ text, children, onClick, type }: ButtonProps) {
  return (
    <>
      <StyledButton $type={type} onClick={onClick}>
        {text}
        {children}
      </StyledButton>
    </>
  )
}

export default Button

const StyledButton = styled.button<{ $type: 'Login' | 'GoBack' | 'Options' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--button-border);
  background: linear-gradient(74deg, #cd3fff 0%, #fc5aff 100%);
  color: white;
  font-weight: 700;
  width: fit-content;
  height: fit-content;

  ${({ $type }) => {
    if ($type === 'Login')
      return css`
        padding: 10px 15px;
        border-radius: 30px;
        font-size: 20px;
        width: 100%;
      `
    else if ($type === 'GoBack')
      return css`
        padding: 15px 23px;
        border-radius: 40px;
        font-size: 18px;
      `
    else
      return css`
        padding: 15px 23px;
        border-radius: 40px;
        font-size: 18px;
        color: #949494;
        border: 1px solid #cdcdcd;
        background: #fff;
      `
  }}
`
