import { afterAuth } from './index';

// 글작성 API
function createPost(post_data) {
  return afterAuth.post('/board/create', post_data);
}

// 새로운 글 불러오기 API
function getPost(offset) {
  return afterAuth.post('/', offset);
}

function getCategory() {
  return afterAuth.post('/get_category');
}

// // 로그아웃 API
// function logOut() {
//     return afterAuth.post('/');
// }

export { createPost, getPost, getCategory };
