import Button from '@/components/Buttons/Button';
import Input from '@/components/Input';
import styled from 'styled-components';
import Image from 'next/image';
import LogoImg from '@/public/icon/logo.svg';
import { useState } from 'react';
import { request } from '@/apis/axios';
import { COLORS } from '@/styles/palatte';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import useManageUserToken from '@/hooks/useManageUserToken';
import { getAccessTokenFromCookie } from '@/utils/getTokenFromCookie';
import { isLoggedIn } from '@/utils/validateRedirection';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  return isLoggedIn(await getAccessTokenFromCookie(context))
    ? {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    : {
        props: {},
      };
};

function Login() {
  const [idText, setIdText] = useState('');
  const [pwText, setPwText] = useState('');
  const [errorText, setErrorText] = useState('');

  const router = useRouter();
  const { saveToken } = useManageUserToken();

  const requestLogin = async () => {
    try {
      const loginRes = await request.post('login_teacher', {
        username: idText,
        password: pwText,
      });

      // response status 200
      saveToken(loginRes.data.token);
      toast.success('로그인 성공');
      router.push('/');
    } catch (error) {
      toast.error('로그인 실패');
      setErrorText('존재하지 않는 아이디이거나 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <PageFlexCenterWrapper>
      <ShadowWrapper>
        <Image src={LogoImg} width={270} alt="logo" />
        <FlexColumnWrapper>
          <TextWrapper>
            <LogoText>Log in</LogoText>
            <DescriptionText>- 교사 계정</DescriptionText>
          </TextWrapper>
          <InputWrapper>
            <Input
              placeholder="교사 아이디"
              text={idText}
              onChange={(e) => {
                setIdText(e.target.value!);
                setErrorText('');
              }}
            />
            <Input
              isPassword
              placeholder="비밀번호"
              text={pwText}
              onChange={(e) => {
                setPwText(e.target.value!);
                setErrorText('');
              }}
            />
            {errorText && <ErrorText>{errorText}</ErrorText>}
          </InputWrapper>
          <Button type="Login" text="로그인" onClick={requestLogin} />
          <GrayText>도움이 필요하신가요?</GrayText>
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
  font-size: 52rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(271deg, #ff00c7 12.61%, #6100ff 95%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DescriptionText = styled.h3`
  font-size: 24rem;
  font-weight: 700;
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
  position: relative;
`;

const GrayText = styled.h5`
  color: ${COLORS.GRAY_94};
  text-align: center;
  font-size: 14rem;
  margin-top: 20px;
  font-weight: 500;
`;

const ErrorText = styled.h5`
  color: ${COLORS.RED};
  font-size: 13rem;
  top: 120px;
  left: 10px;
  position: absolute;
`;
