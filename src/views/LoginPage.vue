<template>
  <div class="LoginPage">
    <UserLogin></UserLogin>
    <!-- <button><span class="wave"></span></button> -->
  </div>
</template>

<script>
import UserLogin from '@/components/User/UserLogin';

export default {
  name: 'LoginPage',
  components: {
    UserLogin,
  },
};
</script>

<style>
@import url('../css/USER.css');
</style>
