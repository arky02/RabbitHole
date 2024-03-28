interface Props {
  statusToBlock: 'Login' | 'Logout';
  accessToken: string | null;
}

export const isLoggedIn = (accessToken: string | null) => {
  return accessToken ? true : false;
};
