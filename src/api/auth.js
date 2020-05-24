// 로그인, 회원 가입, 로그아웃
import { instance } from './index';
import { afterAuth } from './index';

// 로그인 API
function loginUser(userData) {
  return instance.post('/auth/login', userData);
}

// 로그아웃 API
function logOut() {
  return afterAuth.post('/');
}

// 사용자 유효성 검사
function authCheck(userData) {
  return afterAuth.post('/auth/token_check', userData);
}

export { loginUser, logOut, authCheck };
