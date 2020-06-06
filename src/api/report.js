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

export { createReport, getReport, getBlacklist, changeCode };
