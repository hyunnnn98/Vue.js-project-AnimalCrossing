import { reportAuth } from './index';

// 1:1 문의 작성 API
function createReport(post_data) {
  return reportAuth.post('/re_create', post_data);
}

// 1:1 문의 내역 조회 API
function getReport(us_id) {
  return reportAuth.get('/get_report_data', {
    params: {
      us_id,
    },
  });
}

// 공지사항 조회 API
function getNotice() {
  return reportAuth.get('/get_notice');
}

// 신고당한 내역 조회 API
function getBlacklist(us_id) {
  return reportAuth.get('/get_blacklist_data', {
    params: {
      us_id,
    },
  });
}

// 통신코드 변경 API
function changeCode(us_data) {
  return reportAuth.post('/change_code', us_data);
}

// 계정 삭제 API
function deleteUser(us_id) {
  return reportAuth.post('/delete_user', us_id);
}

// 탈퇴전 이메일 인증 API
function emailCheck(us_email) {
  return reportAuth.post('/delete_email_check', us_email);
}

export {
  createReport,
  getReport,
  getBlacklist,
  changeCode,
  getNotice,
  deleteUser,
  emailCheck,
};
