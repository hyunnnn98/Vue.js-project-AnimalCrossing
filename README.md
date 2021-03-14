# Trade With Animalcrossing - Vue.js

### GooglePlay Store 정식 출시
<img src="https://user-images.githubusercontent.com/52916934/97780868-afb2b380-1bca-11eb-84d8-545ca1d934f8.png" width="500">

### GoolePlay Store 어플리케이션 홍보물
![스크린샷 전체샷](https://user-images.githubusercontent.com/52916934/97780865-a9243c00-1bca-11eb-8185-0963ede724cd.png)

## Trade With Animalcrossing Vue 소스 코드입니다.

### 기술 스택

- Vue.js 
- Ionic
- Ionic Vue Router
- Vuex
- Axios

> ### Node 기반 서버의 소스코드는 아래의 Repository에 기재되어 있습니다.
> <a href="https://github.com/kokomade98/Node.js-project-AnimalCrossing">Node.js-project-AnimalCrossing</a>

## 거래 프로세스 UML
![거래 프로세스](https://user-images.githubusercontent.com/52916934/97780994-b3930580-1bcb-11eb-848c-fbf84b980e79.png)

## 개발 일지

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

### 2020.06.13 ~ 13
```
* [UPDATE]
1. validation 추가.
2. console.log 걷어내기 + 주석달기.
```

### 2020.06.14 ~ 17
```
* [UPDATE]
1. 웹사이트 오픈. (https://animalcro.com)
2. 버그 테스트.
3. 아이콘 UI 수정.
4. Google Analytics, Google Search Console 등록.
```

### 2020.06.17 ~ 2020.06.18
```
* [UPDATE]
1. (회원가입) 비밀번호 특수문자 허용.
2. (회원가입) 벨리데이션 success 인증 문구 추가.
3. (회원가입) 지메일 스팸처리건 토스트 메시지 공지 추가.
4. (메인페이지) 모바일 폰트 크기 수정.
5. (글작성) 제목 글자수 16자로 제한.
```

### 2020.06.18
```
* [UPDATE]
1. 시작 페이지 메인 화면으로 변경. ( 폐쇄적인 접근성 수정 )
2. (회원가입) 이메일 중복 체크.
3. (메인페이지) 광고 추가.
4. (메인페이지) 공지사항 보기 추가.
5. (게시물) 공개 / 비공개 설정 UI 수정.
6. (게시물) 삭제간에 사용자 2차 확인 추가.
```

### 2020.06.19
```
* [CREATE]
1. Native Refreshers 추가 => 새로고침 수정.
```

### 2020.06.23
```
* [CREATE]
1. 모바일 어플 관련, Version 체크 API 추가.
2. 모바일 광고 제거.
3. 모바일 icon / splash 이미지 변경.
```
