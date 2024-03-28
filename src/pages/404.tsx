import Button from '@/components/Buttons/Button';
import { FlexColumnCenterAll } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function NotFound() {
  const router = useRouter();
  return (
    <Wrapper>
      <MainText>4..4</MainText>
      <Rabbit>🐰</Rabbit>
      <Desc>페이지가 존재하지 않습니다!</Desc>
      <Button
        type="Options"
        text="홈으로 돌아가기"
        onClick={() => router.push('/')}
      ></Button>
    </Wrapper>
  );
}

export default NotFound;

const Wrapper = styled(FlexColumnCenterAll)`
  height: 100vh;
  position: relative;
`;

const MainText = styled.h1`
  font-size: 255rem;
  font-weight: 700;
  color: #d86bff;
`;

const Desc = styled.h5`
  color: ${COLORS.GRAY_66};
  font-size: 25rem;
  margin-bottom: 35rem;
`;

const Rabbit = styled.h5`
  position: absolute;
  font-size: 230rem;
  top: 240rem;
`;
