<template>
  <ion-content class="ion-padding passport">
    <UserJoin></UserJoin>
  </ion-content>
</template>

<script>
import UserJoin from '@/components/User/UserJoin';

export default {
  name: 'PassportPage',
  components: {
    UserJoin,
  },
};
</script>

<style>
@import url('../css/USER.css');
</style>
