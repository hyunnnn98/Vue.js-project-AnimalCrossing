<template>
  <div class="user-container">
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
      <li>
        <div @click="submit" class="ani-btn success">
          등록하기
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { joinUser } from '@/api/auth';
import { toastController, toastErrorController } from '@/utils/toastController';

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
          toastController(
            this.$ionic,
            '입력하신 이메일로 인증 메일을 전송합니다. \n인증이 끝난 후 부터 로그인이 가능합니다.',
            'success',
          );
          this.$router.replace('/login');
        })
        .catch(err => {
          toastErrorController(this.$ionic, err);
        });
    },
  },
};
</script>

<style>
h1 {
  margin-top: 1em;
  margin-bottom: 1em;
  font-family: '뽀로로';
  font-size: 30px;
  text-align: center;
  color: #7e693a;
}

.join-ion-item-custom {
  margin-top: 30px;
}

.btn-custom {
  font-size: 20px;
  margin-top: 1em;
  --border-radius: 50px;
  font-family: '뽀로로';
}
</style>
