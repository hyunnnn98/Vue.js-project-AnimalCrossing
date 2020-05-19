<template>
  <ion-app>
    <!-- TODO 로그인 상태에 따라 페이지 이동 -->
    <ion-vue-router></ion-vue-router>
    <AppTabs></AppTabs>
  </ion-app>
</template>

<script>
import AppTabs from '@/views/AppTabs.vue';

export default {
  name: 'App',
  components: {
    AppTabs,
  },
};
</script>

<style></style>
