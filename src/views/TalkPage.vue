<template>
  <div class="talk">
    <ul v-if="talks">
      <TalkBox
        :room_data="talk"
        v-for="(talk, index) in talks"
        :key="index"
      ></TalkBox>
    </ul>
  </div>
</template>

<script>
import TalkBox from '@/components/Talk/TalkBox.vue';
import { dateFormat } from '@/utils/dateFormat';

export default {
  name: 'TalkPage',
  components: {
    TalkBox,
  },
  data() {
    return {
      talks: null,
    };
  },
  beforeDestroy() {
    this.$store.state.socket.off('get_chat_data');
  },
  async created() {
    await this.$store.state.socket.on('get_chat_data', async data => {
      console.log('[Talk] 받은 룸 데이터: ', data);
      const new_date = new Date();
      data.forEach(async v => {
        let return_date = dateFormat(new_date, v.createdAt, 'chat');
        v.createdAt = return_date;
        // 내용 길이 제한.
        if (v.ch_content.length > 12) {
          v.ch_content = (await v.ch_content.substring(0, 12)) + '..';
        }
        // 제목 길이 제한.
        if (v.board.bo_title.length > 12) {
          let return_title = (await v.board.bo_title.substring(0, 7)) + '..';
          v.board.bo_title = return_title;
        }
        // console.log('타이틀 :', return_title);
      });
      this.talks = data;
    });
  },
  async mounted() {
    // 채팅 데이터 업데이트.
    await this.$store.state.socket.emit(
      'get_chat_data',
      this.$store.state.us_id,
    );
    console.log('TALK 데이터 요청 보내기!');
  },
};
</script>

<style>
@import url('../css/TALK.css');
</style>
