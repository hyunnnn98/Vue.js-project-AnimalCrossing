import { afterAuth } from './index';

// 글작성 API
function createPost(post_data) {
  return afterAuth.post('/board/bo_create', post_data);
}

// 새로운 글 불러오기 API
function getPost(post_data) {
  return afterAuth.post('/', post_data);
}

// 게시글 삭제 API
function deletePost(bo_id, us_id) {
  return afterAuth.delete('/board/bo_destroy', {
    params: {
      bo_id,
      us_id,
    },
  });
}

// 게시글 업데이트 API
function updatePost(post_data) {
  return afterAuth.post('/board/bo_update', post_data);
}

//TODO 인기 카테고리 가져오기
// function getPopCategory() {
//   return afterAuth.get('/get_category');
// }

// 카테고리 가져오기
function getCategory() {
  return afterAuth.post('/get_category');
}

// 상세 정보데이터 가져오기
function getDetailPost(bo_id, us_id) {
  return afterAuth.get('/board/detail/', {
    params: {
      bo_id,
      us_id,
    },
  });
}

// 게시글 공개,비공개
function showPost(bo_id, bo_show) {
  return afterAuth.get('/board/show', {
    params: {
      bo_id,
      bo_show,
    },
  });
}

// 조회수 관리
function setPostView(bo_id) {
  return afterAuth.get('/board/view', {
    params: {
      bo_id,
    },
  });
}

// 좋아요 , 싫어요
function setLikeHate(us_id, bo_id, selected) {
  return afterAuth.get('/board/set_likehate', {
    params: {
      us_id,
      bo_id,
      selected,
    },
  });
}

// 검색 기능
function searchPost(text) {
  return afterAuth.get('/search', {
    params: {
      text,
    },
  });
}

// 과거 판매했던 기록 불러오기
function getTradeData(us_id, bo_trade_value) {
  return afterAuth.get('/get_trade_data', {
    params: {
      us_id,
      bo_trade_value,
    },
  });
}

// 과거 구매했던 기록 불러오기
// 과거 교환했던 기록 불러오기

export {
  createPost,
  getPost,
  getCategory,
  getDetailPost,
  setPostView,
  setLikeHate,
  searchPost,
  showPost,
  deletePost,
  updatePost,
  getTradeData,
};
