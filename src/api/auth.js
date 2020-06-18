// 로그인, 회원 가입, 로그아웃
import { instance } from './index';
import { afterAuth } from './index';

// 회원가입 API
function joinUser(userData) {
  return instance.post('/auth/register', userData);
}

// 이메일 중복 체크 API
function emailCheck(us_email) {
  return instance.get('/auth/email_check', {
    params: {
      us_email,
    },
  });
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

// 비밀번호 찾기
function getPassword(us_email) {
  return afterAuth.get('/auth/set_temp_password', {
    params: {
      us_email,
    },
  });
}

// 비밀번호 변경
// 유저아이디 us_id, 기존패스워드 us_password, 새로운패스워드 _us_password
function updatePassword(new_password) {
  return afterAuth.post('/auth/update_password', new_password);
}

export {
  joinUser,
  emailCheck,
  loginUser,
  logOut,
  authCheck,
  getPassword,
  updatePassword,
};
