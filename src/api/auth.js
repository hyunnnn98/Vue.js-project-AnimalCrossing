// 로그인, 회원 가입, 로그아웃
import { instance } from './index';
import { afterAuth } from './index';

// 회원가입 API
function joinUser(userData) {
  return instance.post('/auth/register', userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post('/auth/login', userData);
}

// 로그아웃 API
function logOut(userData) {
  return afterAuth.post('/auth/logout', userData);
}

// 사용자 유효성 검사
function authCheck(userData) {
  return afterAuth.post('/auth/token_check', userData);
}

export { joinUser, loginUser, logOut, authCheck };
