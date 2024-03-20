import Input from '@/components/Input'
import styled from 'styled-components'

function Login() {
  return (
    <PageFlexCenterWrapper>
      <ShadowWrapper>
        <LogoText>Login</LogoText>
        <Input placeholder="교사 아이디"></Input>
        <Input placeholder="비밀번호"></Input>
      </ShadowWrapper>
    </PageFlexCenterWrapper>
  )
}

export default Login

const PageFlexCenterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ShadowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 538px;
  height: 437px;
  border-radius: 40px;
  border: 1px solid #cdcdcd;
  background: #fff;
  box-shadow: 0px 4px 19.8px 0px rgba(0, 0, 0, 0.25);
`

const LogoText = styled.h1`
  text-align: center;
  font-size: 52px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(271deg, #ff00c7 12.61%, #6100ff 95%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
