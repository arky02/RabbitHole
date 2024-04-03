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
      request.get(`list_students_in_session?session_id=47`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    enabled: !!accessToken,
  };
};

export const getStudentInfo = (accessToken: string, studentUId: number) => {
  return {
    queryKey: ['studentInfo', studentUId],
    queryFn: () =>
      request.get(`get_student_info?student_uid=${studentUId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    enabled: !!accessToken,
  };
};
