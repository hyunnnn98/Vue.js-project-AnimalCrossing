<template>
  <div class="modal-reportList">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label><span>*</span> 문의유형</ion-label>
        <ion-select
          interface="popover"
          placeholder="선택"
          :value="re_category"
          @ionChange="re_category = $event.target.value"
        >
          <ion-select-option value="회원정보">회원정보</ion-select-option>
          <ion-select-option value="계정정지">계정정지</ion-select-option>
          <ion-select-option value="거래">거래</ion-select-option>
          <ion-select-option value="개발자 피드백">
            개발자 피드백
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ul class="qu-list">
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
    </ion-content>
  </div>
</template>

<script>
import store from '../../store/index';
import ModalHeader from '@/components/common/ModalHeader';
import { getReport } from '@/api/report';
import { toastController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '1 : 1 문의내역',
      re_title: null,
      re_content: null,
      re_category: null,
      re_lists: null,
      click_view: -1,
    };
  },
  async mounted() {
    const { data } = await getReport(store.state.us_id);
    this.re_lists = data.info;
    console.log(data.info);
  },
  methods: {
    change_view(_id) {
      console.log(_id);
      this.click_view = _id;
    },
  },
};
</script>

<style></style>
