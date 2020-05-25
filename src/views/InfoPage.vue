<template>
  <div class="info">
    인포페이지 입니다!
    <button @click="logout_submit">로그아웃</button>
  </div>
</template>

<script>
import { logOut } from '@/api/auth';

export default {
  name: 'InfoPage',
  components: {},
  methods: {
    async logout_submit() {
      const data = { us_id: this.$store.state.us_id };
      const logout_info = await logOut(data);
      if (logout_info) {
        await this.$store.dispatch('LOGOUT');
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style>
.info {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
}
</style>
