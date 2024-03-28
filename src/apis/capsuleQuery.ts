import { request } from './axios';

export const getClassInfo = (accessToken: string) => {
  return {
    queryKey: ['classInfo'],
    queryFn: () =>
      request.get('list_classes', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    enabled: !!accessToken,
  };
};
