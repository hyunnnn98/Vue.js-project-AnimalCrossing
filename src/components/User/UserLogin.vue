<template>
  <div class="user-container">
    <img src="../../imgs/logo.png" alt="logo" />
    <ul>
      <li>
        <!-- div 에서 ion-item 으로 교체 -->
        <!-- 라벨 이미지 추가할 것 -->
        <ion-item class="login-item">
          <ion-label class="login-label" position="fixed"
            ><img src="../../imgs/로그인_아이디.png"
          /></ion-label>
          <ion-input
            class="login-input"
            type="text"
            placeholder="email"
            :value="us_email"
            @input="us_email = $event.target.value"
          ></ion-input>
        </ion-item>
      </li>
      <li>
        <ion-item class="login-item">
          <ion-label class="login-label" position="fixed"
            ><img src="../../imgs/로그인_비밀번호.png"
          /></ion-label>
          <ion-input
            class="login-input"
            type="password"
            placeholder="password"
            :value="us_password"
            @input="us_password = $event.target.value"
          ></ion-input>
        </ion-item>
      </li>
      <li v-if="message" class="warning">{{ message }}</li>
      <li>
        <div @click="submitForm" class="ani-btn success">로그인</div>
      </li>
      <li>
        <div class="login_footer">
          <span @click="$router.push('/passport')">회원가입</span>
          <span @click="$router.push('/findPW')">비밀번호 찾기</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

export default {
  data() {
    return {
      us_email: null,
      us_password: null,
      message: null,
      us_fcmtoken: null,
      us_access: false,
      device_info: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const { Device } = Plugins;
        const us_device = await Device.getInfo();
        this.device_info = us_device.platform;
        if (this.device_info != 'web') {
          // 모바일 전용
          const { PushNotifications } = Plugins;
          await PushNotifications.register();
          // FCM 토큰 발급
          await PushNotifications.addListener('registration', async token => {
            this.us_fcmtoken = await token.value;
            const m_user_data = {
              us_email: this.us_email,
              us_password: this.us_password,
              us_fcmtoken: this.us_fcmtoken,
            };
            this.us_access = await this.$store.dispatch('LOGIN', m_user_data);
            if (this.us_access) this.$router.push('/main');
          });
        } else {
          // 웹 전용
          const w_user_data = {
            us_email: this.us_email,
            us_password: this.us_password,
          };
          this.us_access = await this.$store.dispatch('LOGIN', w_user_data);
          if (this.us_access) this.$router.push('/main');
        }
      } catch (err) {
        this.message = err.response.data.message;
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
}

.login-label {
  --background: rgba(255, 255, 255, 0) !important;
}

.login-input {
  letter-spacing: 0.9px;
  --padding-bottom: 0px;
  margin-left: -95px;
}

.login_footer {
  margin-right: 1em;
  float: right;
  font-size: 14px;
  font-family: '뽀로로';
  color: #7e693a;
}

.login_footer > span {
  margin-left: 20px;
}
</style>
