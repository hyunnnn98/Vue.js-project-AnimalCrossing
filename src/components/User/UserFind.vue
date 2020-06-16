<template>
  <div class="user-container">
    <ion-icon class="backUrl left" name="arrow-back" @click="go_back" />
    <h1>비밀번호 찾기</h1>
    <ion-item class="login-item">
      <ion-label class="login-label" position="fixed"
        ><img src="../../imgs/로그인_아이디.png"
      /></ion-label>
      <ion-input
        class="login-input"
        type="text"
        placeholder="이메일을 입력해주세요."
        :value="us_email"
        @input="us_email = $event.target.value"
      ></ion-input>
    </ion-item>
    <div @click="get_password" class="password-footer ani-btn success">
      이메일 인증하기
    </div>
  </div>
</template>

<script>
import { getPassword } from '@/api/auth';
import { toastController } from '@/utils/toastController';

export default {
  data() {
    return {
      us_email: '',
      email_status: false,
    };
  },
  methods: {
    async get_password() {
      let msg, status;
      if (this.email_status === true)
        return toastController(
          this.$ionic,
          '메일함에서 임시 비밀번호를 확인해주세요!',
          'success',
        );
      try {
        const { data } = await getPassword(this.us_email);
        msg =
          '이메일 인증에 성공하였습니다. \n임시 비밀번호가 발급되어 메일로 전송하였습니다. \n안전한 비밀번호로 재설정해주세요!';
        status = 'success';
        this.email_status = true;
      } catch (error) {
        msg = await error.response.data.message;
        status = 'warning';
      }
      toastController(this.$ionic, msg, status);
    },
    go_back() {
      try {
        this.$router.go(-1);
      } catch (error) {
        this.$ionic.modalController.dismiss();
      }
    },
  },
};
</script>

<style>
.login-label > img {
  width: 20px;
}

.login-item {
  --background: rgba(255, 255, 255, 0) !important;
  --background-focused: rgba(255, 255, 255, 0) !important;
}

.login-label {
  --background: rgba(255, 255, 255, 0) !important;
}

.login-input {
  letter-spacing: 0.5px;
  --padding-bottom: 0px;
  margin-left: -95px;
}

.password-footer {
  margin-top: 2em;
  margin-right: 0.5em;
  float: right;
}
</style>
