import { afterAuth } from './index';

// 글작성 API
function createPost(post_data) {
  return afterAuth.post('/board/create', post_data);
}

// 새로운 글 불러오기 API
function getPost(offset) {
  return afterAuth.post('/', offset);
}

// 카테고리 가져오기
function getCategory() {
  return afterAuth.post('/get_category');
}

// 상세 정보데이터 가져오기
function getDetailPost(bo_id) {
  return afterAuth.get('/board/detail/', {
    params: {
      bo_id,
    },
  });
}

// // 로그아웃 API
// function logOut() {
//     return afterAuth.post('/');
// }

export { createPost, getPost, getCategory, getDetailPost };
