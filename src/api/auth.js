// 로그인, 회원 가입, 로그아웃
import { instance } from './index';
import { afterAuth } from './index';

// 로그인 API
function loginUser(userData) {
  return instance.post('/login', userData);
}

// 로그아웃 API
function logOut() {
  return afterAuth.post('/logout');
}

export { loginUser, logOut };
