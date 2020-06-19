<template>
  <!-- 공지사항 영역. -->
  <div class="Notice">
    <div class="top_3_notice">
      <div class="notice_title"><p>Notice</p></div>
      <ul class="notice_container">
        <li v-for="(list, index) of no_lists" :key="index">
          <span>{{ index + 1 }}. </span> {{ list.no_title }}
        </li>
        <li @click="notice_modal">자세히 보기..</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getNotice } from '@/api/report';
import InfoNoticeModal from '@/components/Info/modal/InfoNoticeModal';

export default {
  data() {
    return {
      no_lists: '',
    };
  },
  async mounted() {
    try {
      // 공지사항 로딩 이벤트
      const { data } = await getNotice();
      this.no_lists = data.info;
    } catch (err) {
      toastErrorController(this.$ionic, err);
    }
  },
  methods: {
    // 공지사항 모달 open 이벤트
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

<style>
.top_3_notice {
  position: absolute;
  right: 20px;
  top: 100px;
  background-color: rgba(255, 255, 255, 0.219);
  letter-spacing: -1px;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 1px 2px 5px rgba(128, 128, 128, 0.52);
}

.notice_title {
  width: 100%;
  color: rgb(0, 0, 0);
  background-color: rgb(188, 229, 245);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-bottom: 1em;
  padding: 3px 0px 2px;
}

.notice_title > p {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: 900;
  letter-spacing: -0.2px;
}

.notice_container {
  padding: 5px 15px;
}

.notice_container li {
  margin-bottom: 0.8em;
  padding-bottom: 0.1em;
  border-bottom: 1px solid black;
}

.notice_container li:nth-last-child(1) {
  cursor: pointer;
  text-align: right;
  border: 0px;
}

.notice_container li span {
  /* background-color: rgb(255, 73, 1);
  color: white;
  font-weight: 700;
  padding: 1px 7px 1px 6px;
  border-radius: 50px; */
  text-align: center;
}
</style>
