<template>
  <ion-app class="app">
    <ion-vue-router></ion-vue-router>
  </ion-app>
</template>

<script>
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { toastController } from '@/utils/toastController';
const { PushNotifications } = Plugins;
const { Device } = Plugins;

export default {
  name: 'App',
  components: {},
  async mounted() {
    // 사용자 아이디가 있을 경우 소켓 접속.
    const us_id = this.$store.state.us_id;
    if (us_id) {
      await this.$store.commit('setSocket');
      await this.$store.state.socket.emit('get_info', us_id);
    }

    // 플랫폼 구분.
    const { platform } = await Device.getInfo();
    //TODO 서버로 부터 버젼 가져오기 ( 사용자가 웹이 아닐 경우 => 버젼 체크 )
    if (platform != 'web' && process.env.VUE_APP_ANICRO_VERSION != '1.0.0') {
      this.$router.push('/update');
      return;
    }
    if (platform != 'web') {
      // Some issue with your setup and push will not work
      PushNotifications.addListener('registrationError', error => {
        // alert('Error on registration: ' + JSON.stringify(error));
        toastController(this.$ionic, '알림 설정 에러...', 'danger');
      });

      // 포그라운드 호출 메서드.
      PushNotifications.addListener(
        'pushNotificationReceived',
        notification => {
          /*
            notification 객체안의 데이터
            1) notification.title
            2) notification.body
          */
          toastController(
            this.$ionic,
            '새로운 메시지가 도착했어요!',
            'tertiary',
            1000,
          );
        },
      );
    }

    // 백그라운드 호출 메서드
    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   notification => {},
    // );
  },
};
</script>
