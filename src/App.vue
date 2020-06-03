<template>
  <ion-app>
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
const { PushNotifications } = Plugins;

export default {
  name: 'App',
  components: {},
  async mounted() {
    const us_id = this.$store.state.us_id;
    if (us_id) {
      await this.$store.commit('setSocket');
      await this.$store.state.socket.emit('get_info', us_id);
    }

    // Some issue with your setup and push will not work
    PushNotifications.addListener('registrationError', error => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // 포그라운드 호출 메서드
    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('알림 도착!');
      alert('안녕!');
    });

    // 백그라운드 호출 메서드
    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   notification => {},
    // );
  },
};
</script>
