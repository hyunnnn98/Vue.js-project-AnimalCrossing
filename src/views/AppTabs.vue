<template>
  <ion-tabs class="m-tabs">
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
          <img class="main_ico" src="../imgs/main_home.png" alt="거래소" />
          <ion-label>거래소</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="post_init" tab="/post">
          <img class="main_ico" src="../imgs/main_post.png" alt="글작성" />
          <ion-label>글작성</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/talk">
          <img class="main_ico" src="../imgs/main_talk.png" alt="유리병편지" />
          <ion-badge>{{ this.talk_count }}</ion-badge>
          <ion-label>유리병 편지</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/info">
          <img class="main_ico" src="../imgs/main_info.png" alt="내정보" />
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
import { EventBus } from '@/utils/bus';

export default {
  name: 'TabPage',
  components: {
    HomeMain,
    TalkMain,
    PostPage,
    InfoPage,
  },
  data() {
    return {
      talk_count: 0,
    };
  },
  created() {
    // [APP] 받은 메세지 개수
    this.$store.state.socket.on('get_read_count', data => {
      this.talk_count = data;
    });
  },
  beforeDestroy() {
    this.$store.state.socket.off('get_read_count');
  },
  async mounted() {
    const us_id = this.$store.state.us_id;
    // 소켓 연결 확인
    await this.$store.commit('setSocket');
    // 사용자 연결 확인
    await this.$store.state.socket.emit('get_us_id', us_id);
    //TODO 룸 데이터 받아오기
    await this.$store.state.socket.on('get_chat_room', data => {
      console.log('받은 룸 데이터: ', data);
    });
    // 미확인 채팅 개수
    await this.$store.state.socket.emit('get_read_count', us_id);
  },
  methods: {
    post_init() {
      EventBus.$emit('post_init');
    },
  },
};
</script>

<style>
.main_ico {
  width: 30px;
}

ion-badge {
  top: 10px;
  left: 70px;
  --background: rgb(6, 202, 46);
}
</style>
