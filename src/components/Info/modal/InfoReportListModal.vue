<template>
  <div class="modal-reportList">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ul v-if="re_lists != ''" class="qu-list">
        <li v-for="(list, index) of re_lists" :key="index">
          <div class="qu-title" @click="change_view(index)">
            <span :class="list.re_status == 0 ? 'qu-ye' : 'qu-co'">
              {{ list.re_status == 0 ? '처리 중' : '답변완료' }}
            </span>
            {{ list.re_title }}
          </div>
          <div
            v-if="list.re_status == 1 && click_view == index"
            class="qu-content"
          >
            {{ list.answer.an_content }}
          </div>
        </li>
      </ul>
      <p v-else>1 : 1 문의내역이 없습니다.</p>
    </ion-content>
  </div>
</template>

<script>
import store from '@/store/index';
import ModalHeader from '@/components/common/ModalHeader';
import { getReport } from '@/api/report';
import { toastErrorController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '문의내역',
      re_title: null,
      re_content: null,
      re_category: null,
      re_lists: null,
      click_view: -1,
    };
  },
  async mounted() {
    try {
      // 1 : 1 문의내용 로딩 이벤트
      const { data } = await getReport(store.state.us_id);
      this.re_lists = data.info;
    } catch (err) {
      toastErrorController(this.$ionic, err);
    }
  },
  methods: {
    change_view(_id) {
      this.click_view = _id;
    },
  },
};
</script>

<style></style>
