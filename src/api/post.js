import { afterAuth } from './index';

// 글작성 API
function createPost(post_data) {
  return afterAuth.post('/board/create', post_data);
}

// // 로그아웃 API
// function logOut() {
//     return afterAuth.post('/');
// }

export { createPost };
