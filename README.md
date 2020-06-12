# Animalcross 거래 사이트

Animalcross Vue 소스 코드입니다.

## 기술 스택

- Vue.js 
- Ionic
- Ionic Vue Router
- Vuex
- Axios

### 2020.05.20
```
* [CREATE]
1. 기존 Vue 셋팅 -> Ionic 셋팅으로 변경
2. CSS 초기화
3. 전체적인 컴포넌트 구조 설계
4. Homepage -> Category Modal 구현
```

### 2020.05.21
```
* [CREATE]
1. Ionic Cli 셋팅 => android 환경 실행 확인.
2. LoginPage, PassportPage 퍼블리싱

* [UPDATE]
1. MainPage UI / UX 재설정.
```

### 2020.05.23
```
* [CREATE]
1. LoginPage, PassportPage, PostPage => 서버 연동 완료.

* [UPDATE]
1. LoginPage, PassportPage css 변경.
```

### 2020.05.25
```
* [CREATE]
1. Android Camera Module 권한 얻고, 이미지 파일 AWS S3 전송.

* [UPDATE]
1. 유저 신뢰성 검사 ( 라우터 이동마다 ) => VueX + VueRouter
```

### 2020.05.26
```
* [CREATE]
1. MainPage 글 데이터 받기
2. 카테고리 데이터 받기.
3. 로그아웃 처리

* [UPDATE]
1. 글 작성 이미지 처리 (AWS S3) 완료. 
```

### 2020.05.27
```
* [CREATE]
1. TalkPage, PostInfoPage 퍼블리싱
2. Socket.io 연동.
```

### 2020.05.28
```
* [CREATE]
1. Socket.io 연동 => Chat data binding
```

### 2020.05.29
```
* [UPDATE]
1. MainPage 태그형식 글 색깔별 구분하기.
2. Category Modal CSS 수정.
3. Mobile 글 작성 => S3 사진 슬라이드 형식 바인딩 완료.
```

### 2020.05.31
```
* [CREATE]
1. Utils => validImageType, DateFormat 추가.

* [UPDATE]
1. PostPage 사진 업로드 PC / Mobile 지원 완료.
2. MainPage flex 형태 디자인 수정.
```

### 2020.06.01
```
* [CREATE]
1. 게시글 좋아요, 싫어요 기능 추가.
2. 메인페이지 검색 기능 추가.

* [UPDATE]
1. ItemPage 라우터 삭제 -> 메인 페이지에서 모달로 View 변경.
```

### 2020.06.02
```
* [CREATE]
1. TalkPage 거래 로직 완료.
```

### 2020.06.03
```
* [CREATE]
1. Mobile FCM 적용 => Message push 테스트 완료.
2. PostPage 게시글 공개/비공개, 삭제 기능 추가.
```

### 2020.06.04
```
* [CREATE]
1. PostPage 게시글 수정 기능 추가.
```

### 2020.06.05
```
* [CREATE]
1. 카테고리 별 페이지 불러오기 추가.
2. 거래 신고하기 기능 추가.

* [UPDATE]
1. 게시글 수정간에 사진 업로드 오류 수정 완료.
```

### 2020.06.06
```
* [CREATE]
1. 관리자페이지 생성 => (유저, 관리자) 1:1 문의 요청 대답 폼 제작
2. 유저 썸네일 변경 기능 추가.
3. 유저 통신코드 변경 기능 추가.
```

### 2020.06.07 ~ 08
```
* [UPDATE]
1. 전반적인 CSS 수정.
2. 채팅방 test => 오류체크.
```

### 2020.06.09 ~ 10
```
* [UPDATE]
1. 내정보 완성하기(거래한 내역 조회)
2. 화폐단위 덩/마일 구분.
3. 소켓통신, 후기 반복 작성 방지.
4. 소켓통신, 중복 거래요청 방지.
```

### 2020.06.11
```
* [CREATE]
1. 비밀번호 찾기, 비밀번호 변경 기능 추가.
2. 리뷰 모달 => 평점 기능 추가.

* [UPDATE]
1. 기존 alert => toast message로 교체.
2. 채팅방 로직 변경.
3. 게시글 좋아요 / 싫어요 CSS 수정.
```

### 2020.06.12
```
* [CREATE]
1. 플레이 스토어 어플 등록.
2. 회원탈퇴 기능 추가.
3. MainPage 새로고침 버튼 생성.
4. 내 정보 거래내역 (비공개 / 공개 / 완료) 표시.

* [UPDATE]
1. MainPage SearchBar 게시글 클릭 기능 추가.
2. 게시글 판매중 / 판매완료 수정버튼 추가.
```