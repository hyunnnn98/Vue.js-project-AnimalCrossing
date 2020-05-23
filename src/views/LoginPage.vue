<template>
  <ion-app class="LoginPage">
    <div class="LoginHeader">로고들어갈 위치</div>
    <div class="LoginBody">
      <ul>
        <li>
          <div>
            <p>이메일</p>
            <input
              type="text"
              :value="us_email"
              @input="us_email = $event.target.value"
            />
          </div>
        </li>
        <li>
          <div>
            <p>비밀번호</p>
            <input
              type="password"
              :value="us_password"
              @input="us_password = $event.target.value"
            />
          </div>
        </li>
        <li>
          <ion-button shape="block" color="success" @click="submitForm">
            로그인
          </ion-button>
        </li>
        <li>
          <div @click="$router.push('/passport')">회원가입</div>
          <div @click="$router.push('/passport')">비밀번호 찾기</div>
        </li>
      </ul>
    </div>
  </ion-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      us_email: null,
      us_password: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const data = {
          us_email: this.us_email,
          us_password: this.us_password,
        };
        const user_info = await this.$store.dispatch('LOGIN', data);
        if (user_info) this.$router.push('/main');
      } catch (err) {
        console.log('[임시] 로그인 실패!', err);
      }
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
