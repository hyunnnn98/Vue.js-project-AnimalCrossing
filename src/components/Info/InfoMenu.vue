<template>
  <div class="myMenu info-bcg">
    <div @click="logout_submit">로그아웃</div>
    <div @click="reportCreate_modal">1:1 문의하기</div>
    <div @click="reportList_modal">1:1 문의내역</div>
    <div @click="notice_modal">공지사항</div>
    <div @click="password_modal">비밀번호 변경</div>
    <div @click="delete_account">회원탈퇴</div>
  </div>
</template>

<script>
import { logOut } from '@/api/auth';
import InfoReportModal from './modal/InfoReportModal';
import InfoReportListModal from './modal/InfoReportListModal';
import InfoNoticeModal from './modal/InfoNoticeModal';
import InfoPasswordModal from './modal/InfoPasswordModal';
import InfoDeleteModal from './modal/InfoDeleteModal';

export default {
  methods: {
    async logout_submit() {
      const data = { us_id: this.$store.state.us_id };
      const logout_info = await logOut(data);
      if (logout_info) {
        await this.$store.dispatch('LOGOUT');
        this.$router.push('/login');
      }
    },
    async reportCreate_modal() {
      let modal = await this.$ionic.modalController.create({
        component: InfoReportModal,
        cssClass: 'talk-modal-css',
        componentProps: {
          propsData: {
            us_id: this.$store.state.us_id,
          },
        },
      });
      modal.present();
    },
    async reportList_modal() {
      let modal = await this.$ionic.modalController.create({
        component: InfoReportListModal,
        cssClass: 'talk-modal-css',
        componentProps: {
          propsData: {
            us_id: this.$store.state.us_id,
          },
        },
      });
      modal.present();
    },
    async password_modal() {
      let modal = await this.$ionic.modalController.create({
        component: InfoPasswordModal,
        cssClass: 'code-modal-css',
        componentProps: {
          propsData: {
            us_id: this.$store.state.us_id,
          },
        },
      });
      modal.present();
    },
    async delete_account() {
      let modal = await this.$ionic.modalController.create({
        component: InfoDeleteModal,
        cssClass: 'code-modal-css',
        componentProps: {
          propsData: {
            us_id: this.$store.state.us_id,
          },
        },
      });
      modal.present();
    },
    async notice_modal() {
      let modal = await this.$ionic.modalController.create({
        component: InfoNoticeModal,
        cssClass: 'talk-modal-css',
        componentProps: {
          propsData: {
            us_id: this.$store.state.us_id,
          },
        },
      });
      modal.present();
    },
  },
};
</script>

<style></style>
