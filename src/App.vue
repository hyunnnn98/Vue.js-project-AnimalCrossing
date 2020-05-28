<template>
  <ion-app>
    <!-- TODO 로그인 상태에 따라 페이지 이동 -->
    <ion-vue-router></ion-vue-router>
  </ion-app>
</template>

<script>
import { EventBus } from '@/utils/bus';

export default {
  name: 'App',
  components: {},
  async mounted() {
    const us_id = this.$store.state.us_id;
    if (us_id) {
      await this.$store.commit('setSocket');
      await this.$store.state.socket.emit('get_info', us_id);
    }
  },
};
</script>
