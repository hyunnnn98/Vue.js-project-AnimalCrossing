import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// 엑시오스 초기화 함수
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 인증된 유저 url 설정 값
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const afterAuth = createInstanceWithAuth('');
export const reportAuth = createInstanceWithAuth('user');
export const reviewAuth = createInstanceWithAuth('review');
// export const
