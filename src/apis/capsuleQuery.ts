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

export const getStudentInSession = (accessToken: string, sessionId: number) => {
  return {
    queryKey: ['sessionStudent', sessionId],
    queryFn: () =>
      request.get(`list_students_in_session?session_id=${sessionId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    enabled: !!accessToken,
  };
};
