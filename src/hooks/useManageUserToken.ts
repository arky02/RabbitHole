import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const useManageUserToken = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
  const router = useRouter();

  const saveToken = (token: string) => {
    const loginTime = 3600; //1시간
    const expiration = new Date(Date.now() + loginTime * 1000);
    setCookie('userToken', token, {
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: expiration,
    });
    setTimeout(() => {
      toast.error('세션이 만료되었습니다. 다시 로그인 해 주세요.');
      window.location.reload();
    }, loginTime * 1000);
  };

  const removeToken = ({ redirectUri }: { redirectUri: string }) => {
    removeCookie('userToken', { path: '/' });
    toast.success('로그아웃 되었습니다!');
    router.push(redirectUri);
  };

  const userToken = cookie.userToken;

  return { userToken, saveToken, removeToken };
};

export default useManageUserToken;
