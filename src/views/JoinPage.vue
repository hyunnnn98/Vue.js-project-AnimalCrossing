<template>
  <ion-content class="ion-padding passport">
    <ion-icon name="arrow-back" @click="$router.push('/login')"></ion-icon>
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
.passport {
  /* margin: 10px; */
  --background: #f8f8f0;
}

.passport ion-icon {
  width: 30px;
  height: 30px;
}

.passport-container {
  border-radius: 10px;
  background-color: white;
  padding: 0 50px 0 50px;
}

.passport-container > ul {
  flex: 1;
}

.passport-container > ul > li {
  margin-bottom: 2em;
  /* background-color: red; */
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

@media (min-width: 500px) {
  .passport-container {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
