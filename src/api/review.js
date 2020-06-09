import { reviewAuth } from './index';

// 거래후기 조회 API
function getReview(us_id) {
  return reviewAuth.get('/rv_get_data', {
    params: {
      us_id,
    },
  });
}

// 거래후기 작성 API
function createReview(review_data) {
  return reviewAuth.post('/rv_create', review_data);
}

// 거래후기 삭제 API
function deleteReview(us_id) {
  return reviewAuth.get('/re_destroy', {
    params: {
      us_id,
    },
  });
}

export { getReview, createReview, deleteReview };
