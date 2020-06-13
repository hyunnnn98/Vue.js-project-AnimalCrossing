<template>
  <div class="modal-updateCode">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label position="floating"><span>*</span> 현재 비밀번호</ion-label>
        <ion-input
          type="password"
          :value="us_password"
          @input="us_password = $event.target.value"
          clear-on-edit="true"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating"
          ><span>*</span> 새로운 비밀번호</ion-label
        >
        <ion-input
          type="password"
          :value="new_us_password"
          @input="new_us_password = $event.target.value"
          clear-on-edit="true"
        ></ion-input>
      </ion-item>
      <p class="validation-text">
        <span class="warning" v-if="!isUserPasswordValid && new_us_password">
          비밀번호 길이는 최소 6자리 ~ 최대 16자리까지 가능합니다.
        </span>
      </p>
    </ion-content>
    <div class="ani-btn sky" @click="update_password()">변경완료</div>
  </div>
</template>

<script>
import ModalHeader from '@/components/common/ModalHeader';
import store from '@/store/index';
import router from '@/router/index';
import { updatePassword } from '@/api/auth';
import { toastController, toastErrorController } from '@/utils/toastController';
import { validatePassword } from '@/utils/validation';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '비밀번호 변경',
      us_password: '',
      new_us_password: '',
    };
  },
  computed: {
    isUserPasswordValid() {
      return validatePassword(this.new_us_password);
    },
  },

  methods: {
    // 비밀번호 변경 이벤트
    async update_password() {
      if (this.us_password == '' || this.new_us_password == '') {
        return toastController(
          this.$ionic,
          '비밀번호를 입력해주세요.',
          'danger',
        );
      }
      try {
        await updatePassword({
          us_id: this.us_id,
          us_password: this.us_password,
          _us_password: this.new_us_password,
        });

        toastController(
          this.$ionic,
          '비밀번호가 변경되었습니다. \n새로운 비밀번호로 로그인해주세요.',
          'success',
        );
        this.$ionic.modalController.dismiss();
        store.dispatch('LOGOUT');
        router.push('/login');
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
};
</script>

<style></style>
