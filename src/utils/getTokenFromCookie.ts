import { GetServerSidePropsContext } from 'next';
import * as cookie from 'cookie';

export const getAccessTokenFromCookie = (
  context: GetServerSidePropsContext,
) => {
  if (!context.req.headers.cookie) return null;
  const cookieString = cookie.parse(context.req.headers.cookie);

  if (!cookieString.userToken) return null;

  return cookieString.userToken;
};
