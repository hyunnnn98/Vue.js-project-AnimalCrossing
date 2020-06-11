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

.passport ion-icon {
  width: 30px;
  height: 30px;
}

.passport-container input {
  border: 0px;
  border-radius: 0px;
  border-bottom: 1.5px solid rgb(172, 172, 172);
  height: 50px;
  font-size: 1.6em;
  padding: 0px;
  text-indent: 0px;
  letter-spacing: -1px;
}
</style>
