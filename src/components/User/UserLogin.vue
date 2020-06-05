<template>
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
      <li v-if="message" class="warning">{{ message }}</li>
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
        console.log('[임시] 로그인 실패!', err.message);
        this.message = err.message;
      }
    },
  },
};
</script>

<style></style>
