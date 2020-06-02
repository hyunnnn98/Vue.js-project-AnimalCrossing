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