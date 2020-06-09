<template>
  <div class="LoginPage">
    <UserLogin></UserLogin>
    <button><span class="wave"></span></button>
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

/* .LoginBody input {
  border: 0px;
  border-radius: 0px;
  font-weight: 300;
  border-bottom: 1.5px solid rgb(172, 172, 172);
  height: 50px;
  font-size: 1.3em;
  padding: 0px;
  text-indent: 0px;
  letter-spacing: -1px;
} */
/* 
.LoginBody input:hover {
  border-bottom: 1.5px solid rgb(0, 0, 0);
} */

/* 물결표시 범위 */
button {
  cursor: default !important;
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0px;
  font-size: 20px;
  cursor: pointer;
  padding: 0.8em 1em;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(black, 0.2);
  background-color: rgba(255, 255, 255, 0);
  transform: translate3d(0, 0, 0);
}

.wave {
  opacity: 0.4;
  position: absolute;
  bottom: 3%;
  left: 50%;
  background: #0af;
  width: 3000px;
  height: 3000px;
  margin-left: -1450px;
  margin-bottom: -2850px;
  animation: rotate 10000ms infinite linear;
  transform-origin: 48% 48%;
  border-radius: 38%;
  transition-duration: 0.75s;
  transition-property: margin-bottom;
  transition-timing-function: ease;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}

@media (min-width: 500px) {
  .LoginBody {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
