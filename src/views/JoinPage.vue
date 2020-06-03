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
  --background: rgb(3, 194, 19);
}

.passport ion-icon {
  width: 30px;
  height: 30px;
}

.passport-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid rgb(3, 194, 19);
  padding: 10px;
  border-radius: 10px;
  background-color: white;
}

.passport-container > h2 {
  font-weight: 900;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 2em;
}

.passport-container > ul {
  flex: 1;
}

.passport-container > ul > li:nth-child(1) {
  text-align: center;
  padding: 10px;
  background-color: rgb(0, 0, 0);
  border-radius: 50px;
  color: white;
  margin: 10px 20px;
}

.passport-container > ul > li:nth-child(2) {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  /* background-color: yellowgreen; */
  border: 2px solid black;
  border-radius: 15px;
  margin-bottom: 2em;
}

.passport-container > ul > li:nth-child(3) {
  /* background-color: teal; */
  /* width: 50%; */
  padding: 10px;
}

.passport-container > ul > li:nth-child(3) > div:nth-child(n) {
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

.passport-container input[type='number'] {
  font-size: 1.4em;
}

.passport-img {
  height: 128px;
  margin: 10px 10px 10px 10px;
  border-radius: 15px;
  border: 2px solid black;
  background-image: url('../imgs/tanuki.png');
  background-size: cover;
  /* background-color: teal; */
}

@media (min-width: 520px) {
  .passport-container {
    width: 520px;
    margin: 0 auto;
  }
}
</style>
