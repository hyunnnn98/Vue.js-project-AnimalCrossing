<template>
  <div class="LoginPage">
    <div class="LoginHeader">로고들어갈 위치</div>
    <UserLogin></UserLogin>
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
.LoginPage {
  width: 100%;
  height: 100%;
}

.LoginHeader {
  color: black;
  text-align: center;
  width: 100%;
  height: 30%;
  /* background-image: url('../imgs/logo.jpg'); */
  /* background-size: cover; */
}

.LoginHeader > h2 {
  position: relative;
  top: 50%;
  font-size: 2rem;
  /* font-weight: bold; */
}

.LoginBody {
  width: 100%;
  height: 70%;
  background-color: white;
}

.LoginBody ul {
  position: relative;
  top: 10%;
  height: 300px;
}

.LoginBody ul li {
  color: black;
  font-size: 1.3em;
  font-weight: bold;
  padding: 0.5em 1em;
  margin: 0.3em;
  border-radius: 25px;
  text-align: left;
  letter-spacing: -1px;
}

.LoginBody p {
  font-size: 0.8em;
}

.LoginBody input {
  border: 0px;
  border-radius: 0px;
  font-weight: 300;
  border-bottom: 1.5px solid rgb(172, 172, 172);
  height: 50px;
  font-size: 1.3em;
  padding: 0px;
  text-indent: 0px;
  letter-spacing: -1px;
}

.LoginBody input:hover {
  border-bottom: 1.5px solid rgb(0, 0, 0);
}

@media (min-width: 500px) {
  .LoginBody {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
