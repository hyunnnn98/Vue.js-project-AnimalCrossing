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
import { EventBus } from '@/utils/bus';

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
  async mounted() {
    // 채팅 데이터 업데이트.
    await this.$store.state.socket.emit(
      'get_chat_data',
      this.$store.state.us_id,
    );
    await this.$store.state.socket.on('get_chat_data', async data => {
      console.log('[Talk] 받은 룸 데이터: ', data);
      this.talks = data;
    });
  },
};
</script>

<style>
.talk {
  overflow-y: scroll;
  max-width: none;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translateX(-50%) translateY(-50%);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 5px;
}

.talk::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
