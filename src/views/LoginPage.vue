<template>
  <div class="LoginPage">
    <div class="LoginHeader"></div>
    <div class="LoginBody">
      <ul>
        <li @click="loginAcess">
          카카오톡으로 시작하기
        </li>
        <li>
          구글로 시작하기
        </li>
        <li>
          페이스북으로 시작하기
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginAcess() {
      console.log('클릭 신호!');
    },
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
  /* background-color: red; */
  width: 100%;
  height: 40%;
  background-image: url('../imgs/logo.jpg');
  background-size: cover;
}

.LoginHeader > h2 {
  position: relative;
  top: 50%;
  font-size: 2rem;
  font-weight: bold;
}

.LoginBody {
  width: 100%;
  height: 60%;
  /* background-color: blue; */
}

.LoginBody ul {
  /* background-color: blue; */
  /* margin-top: 20%; */
  position: relative;
  top: 10%;
  height: 300px;
}

.LoginBody ul li {
  /* border: 2px solid black; */
  color: white;
  font-size: 1.4em;
  font-weight: bold;
  padding: 1em 2em;
  margin: 2em;
  border-radius: 10px;
  text-align: center;
}

.LoginBody ul li:nth-child(1) {
  color: black;
  background-color: #ffdf00;
}

.LoginBody ul li:nth-child(1):hover {
  background-color: #f8d701;
}

.LoginBody ul li:nth-child(2) {
  background-color: #3f67af;
}

.LoginBody ul li:nth-child(2):hover {
  background-color: #3b60a5;
}

.LoginBody ul li:nth-child(3) {
  background-color: #fd6e5e;
}

.LoginBody ul li:nth-child(3):hover {
  background-color: #f1695a;
}
</style>
