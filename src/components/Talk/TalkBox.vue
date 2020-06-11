<template>
  <li v-if="room_data" @click="join_room" class="talk-box">
    <div class="talk-avater">
      <img :src="`${room_data.user.us_thumbnail}`" alt="썸네일" />
    </div>
    <div class="talk-content">
      <p class="talk-title">{{ room_data.board.bo_title }}</p>
      <p class="talk-nickname">{{ room_data.user.us_nickname }}</p>
      <p class="talk-lastcontent">{{ room_data.ch_content }}</p>
    </div>
    <div class="talk-info">
      {{ room_data.createdAt }}
      <p class="talk-read" v-if="room_data.ch_read">{{ room_data.ch_read }}</p>
    </div>
  </li>
</template>

<script>
import { toastController } from '@/utils/toastController';

export default {
  props: {
    room_data: {
      type: Object,
    },
  },
  methods: {
    join_room() {
      if (this.$store.state.us_grant === -1) {
        let msg =
          '위험한 유저로 신고 처리되어, 거래 서비스 이용이 불가합니다. \n1:1 게시판을 이용해 신고내역을 확인해주세요.';
        toastController(this.$ionic, msg, 'warning');
        return;
      }
      this.$router.push(`/talk/${this.room_data.ch_ro_id}`);
      this.$store.state.socket.emit(
        'join_room',
        this.$store.state.us_id,
        this.room_data.ch_ro_id,
      );
      this.$store.state.socket.emit('get_read_count', this.$store.state.us_id);
    },
  },
};
</script>

<style></style>
