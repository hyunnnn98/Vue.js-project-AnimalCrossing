<template>
  <div class="myMenu">
    <button @click="logout_submit">로그아웃</button>
    <button @click="reportCreate_modal">1:1 문의하기</button>
    <button @click="reportList_modal">1:1 문의내역</button>
    <button @click="reportList_modal">공지사항</button>
  </div>
</template>

<script>
import { logOut } from '@/api/auth';
import InfoReportModal from './InfoReportModal';
import InfoReportListModal from './InfoReportListModal';

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
  },
};
</script>

<style>
.myMenu {
  margin-top: 0.5em;
  background-color: rgba(197, 197, 197, 0.061);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0px;
  width: 100%;
}
</style>
