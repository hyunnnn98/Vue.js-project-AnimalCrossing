<template>
  <div class="modal-updateCode">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label position="floating"
          ><span>*</span> 현재 사용중인 이메일을 입력하세요.</ion-label
        >
        <ion-input
          type="text"
          :value="us_email"
          @input="us_email = $event.target.value"
          clear-on-edit="true"
        ></ion-input>
      </ion-item>
    </ion-content>
    <div class="ani-btn success" @click="email_check(us_email)">인증하기</div>
    <div class="choose-container">
      <div class="ani-btn danger" @click="$ionic.modalController.dismiss()">
        취소
      </div>
      <div
        :class="delete_access ? 'sky' : 'disable'"
        class="ani-btn"
        @click="delete_account(delete_access)"
      >
        회원탈퇴
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from '@/components/common/ModalHeader';
import store from '@/store/index';
import router from '@/router/index';
import { deleteUser, emailCheck } from '@/api/report';
import { toastController, toastErrorController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '회원탈퇴',
      us_email: '',
      delete_access: false,
    };
  },
  methods: {
    async email_check(us_email) {
      try {
        const { data } = await emailCheck({
          us_id: this.us_id,
          us_email,
        });
        toastController(this.$ionic, data.message, 'success');
        this.delete_access = true;
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    async delete_account() {
      if (this.access == false) return;
      try {
        await deleteUser({
          us_id: this.us_id,
        });

        toastController(
          this.$ionic,
          '회원 탈퇴를 완료하였습니다. \n이용해주셔서 감사합니다.',
          'success',
        );
        store.state.socket.emit('delete_account', this.us_id);
        this.$ionic.modalController.dismiss();
        store.dispatch('LOGOUT');
        router.push('/login');
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    // delete_account(access) {
    //   if (access == false) return;
    //   this.delete_access = true;
    // },
  },
};
</script>

<style></style>
