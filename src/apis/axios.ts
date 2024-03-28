import useManageUserToken from '@/hooks/useManageUserToken';
import axios from 'axios';

const BASE_URL = 'https://api.rabbitholecompany.com/';

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url: string, options?: {}) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },

    ...options,
  });
  return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
// const axiosAuthApi = (url: string, token: string, options?: {}) => {
//   const instance = axios.create({
//     baseURL: url,
//     headers: { Authorization: 'Bearer ' + token },
//     ...options,
//   });
//   return instance;
// };

export const request = axiosApi(BASE_URL);
