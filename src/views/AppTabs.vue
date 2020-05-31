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
          <ion-icon name="home"></ion-icon>
          <ion-label>홈</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/post">
          <ion-icon name="create"></ion-icon>
          <ion-label>글작성</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="/talk">
          <ion-icon name="chatbubbles"></ion-icon>
          <ion-badge>{{ this.talk_count }}</ion-badge>
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
import { EventBus } from '@/utils/bus';

export default {
  name: 'TabPage',
  data() {
    return {
      talk_count: 0,
    };
  },
  created() {
    this.$store.state.socket.on('get_read_count', data => {
      console.log('[APP] 받은 메세지 개수: ', data);
      this.talk_count = data;
    });

    this.$store.state.socket.on('send_message_notification', data => {
      console.log('[APP] 받은 룸 소식: ', data);
      alert(data);
      // this.talk_count = data;
    });
  },
  beforeDestroy() {
    this.$store.state.socket.off('get_read_count');
    this.$store.state.socket.off('send_message_notification');
  },
  async mounted() {
    const us_id = this.$store.state.us_id;
    await this.$store.commit('setSocket');
    await this.$store.state.socket.emit('get_us_id', us_id);
    await this.$store.state.socket.on('get_chat_room', data => {
      console.log('받은 룸 데이터: ', data);
    });
    await this.$store.state.socket.emit('get_read_count', us_id);
  },
  methods: {},

  components: {
    HomeMain,
    TalkMain,
    PostPage,
    InfoPage,
  },
};
</script>

<style></style>
