import Button from '@/components/Buttons/Button';
import Input from '@/components/Input';
import styled from 'styled-components';
import Image from 'next/image';
import LogoImg from '/public/icon/logo.svg';

function Login() {
  return (
    <PageFlexCenterWrapper>
      <ShadowWrapper>
        <Image src={LogoImg} width={270} alt="logo"></Image>
        <FlexColumnWrapper>
          <TextWrapper>
            <LogoText>Log in</LogoText>
            <DescriptionText>- 교사 계정</DescriptionText>
          </TextWrapper>
          <InputWrapper>
            <Input placeholder="교사 아이디"></Input>
            <Input placeholder="비밀번호"></Input>
          </InputWrapper>
          <Button type="Login" text="로그인" />
        </FlexColumnWrapper>
      </ShadowWrapper>
    </PageFlexCenterWrapper>
  );
}

export default Login;

const PageFlexCenterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const ShadowWrapper = styled.div`
  display: flex;
  width: fit-content;
  gap: 100px;
  padding: 0 90px;
  align-items: center;
  justify-content: center;
  height: 437px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0px 4px 25px 7px rgba(0, 0, 0, 0.08);
`;

const FlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 43px;
`;

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
`;

const DescriptionText = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;
