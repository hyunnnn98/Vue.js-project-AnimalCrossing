<template>
  <ion-tabs>
    <!-- 홈화면 바로가기 -->
    <ion-tab tab="/main">
      <HomeMain></HomeMain>
    </ion-tab>

    <!-- 글작성 바로가기 -->
    <ion-tab tab="/post">
      <PostPage></PostPage>
    </ion-tab>

    <!-- 소켓톡방 바로가기 -->
    <ion-tab tab="/talk">
      <TalkMain></TalkMain>
    </ion-tab>

    <!-- 내정보 바로가기 -->
    <ion-tab tab="/info">
      <InfoPage></InfoPage>
    </ion-tab>

    <template slot="bottom">
      <ion-tab-bar>
        <ion-tab-button tab="/main">
          <ion-icon name="home"></ion-icon>
          <ion-label>홈</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/post">
          <ion-icon name="create"></ion-icon>
          <ion-label>글작성</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/talk">
          <ion-icon name="chatbubbles"></ion-icon>
          <ion-badge>233</ion-badge>
          <ion-label>채팅</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/info">
          <ion-icon name="information-circle"></ion-icon>
          <ion-label>내정보</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </template>
  </ion-tabs>
</template>

<script>
import TalkMain from '@/views/TalkPage.vue';
import HomeMain from '@/views/HomePage.vue';
import PostPage from '@/views/PostPage.vue';
import InfoPage from '@/views/InfoPage.vue';

export default {
  components: {
    HomeMain,
    TalkMain,
    PostPage,
    InfoPage,
  },
};
</script>

<style>
/* ion-badge {
  left: 75px;
  top: 5px;
} */
</style>
