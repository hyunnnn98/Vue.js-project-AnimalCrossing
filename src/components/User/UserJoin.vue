<template>
  <div class="passport-container">
    <ul>
      <li>
        <h1>회원가입</h1>
      </li>
      <li>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">이메일</ion-label>
          <ion-input
            type="text"
            :value="us_email"
            @input="us_email = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">비밀번호</ion-label>
          <ion-input
            type="password"
            :value="us_password"
            @input="us_password = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">이름</ion-label>
          <ion-input
            type="text"
            :value="us_nickname"
            @input="us_nickname = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">섬 이름</ion-label>
          <ion-input
            type="text"
            :value="us_islandname"
            @input="us_islandname = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">통신코드</ion-label>
          <ion-input
            type="number"
            :value="us_code"
            @input="us_code = $event.target.value"
          ></ion-input>
        </ion-item>
      </li>
    </ul>
    <ion-button
      class="btn-custom"
      size="large"
      shape="block"
      color="danger"
      @click="submit"
    >
      등록하기
    </ion-button>
  </div>
</template>

<script>
import { joinUser } from '@/api/auth';

export default {
  data() {
    return {
      us_email: null,
      us_password: null,
      us_nickname: null,
      us_islandname: null,
      us_code: null,
    };
  },
  methods: {
    submit() {
      const data = {
        us_email: this.us_email,
        us_password: this.us_password,
        us_nickname: this.us_nickname,
        us_islandname: this.us_islandname,
        us_code: this.us_code,
      };
      joinUser(data)
        .then(res => {
          console.log(res);
          this.$router.replace('/login');
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
h1 {
  margin-bottom: 100px;
  font-family: '뽀로로';
  font-size: 30px;
  text-align: center;
  color: #7e693a;
}

.passport-container {
  background-color: rgba(255, 255, 255, 0) !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.join-ion-item-custom {
  margin-top: 30px;
  --background: rgba(255, 255, 255, 0) !important;
  --background-focused: rgba(255, 255, 255, 0) !important;
}

.btn-custom {
  font-size: 20px;
  margin-top: 100px;
  --border-radius: 50px;
  font-family: '뽀로로';
}
</style>
