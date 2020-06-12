<template>
  <div class="modal-info">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label position="floating"><span>*</span> 제목</ion-label>
        <ion-input
          :value="re_title"
          @input="re_title = $event.target.value"
          clear-on-edit="true"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label><span>*</span> 문의유형</ion-label>
        <ion-select
          interface="popover"
          placeholder="선택"
          :value="re_category"
          @ionChange="re_category = $event.target.value"
        >
          <ion-select-option value="회원정보">회원정보</ion-select-option>
          <ion-select-option v-if="re_bl_lists != null" value="계정정지">
            계정정지
          </ion-select-option>
          <ion-select-option value="거래">거래</ion-select-option>
          <ion-select-option value="개발자 피드백">
            개발자 피드백
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item class="qu-category" v-if="re_category == '계정정지'">
        <ion-label><span>*</span> 신고당한 게시글</ion-label>
        <ion-select
          interface="popover"
          placeholder="선택"
          :value="re_bl_id"
          @ionChange="re_bl_id = $event.target.value"
        >
          <ion-select-option
            :value="list.bl_id"
            v-for="(list, index) of re_bl_lists"
            :key="index"
          >
            {{ list.bl_bo_title }}
          </ion-select-option>
          <!-- <ion-select-option value="1">
            너구리 싸게 판매합니다
          </ion-select-option>
          <ion-select-option value="2">무료나눔해요</ion-select-option>
          <ion-select-option value="3">빠른 거래 해요!!</ion-select-option> -->
        </ion-select>
      </ion-item>
      <ion-textarea
        placeholder="문의 내용을 적어주세요."
        class="info-textarea"
        :value="re_content"
        @input="re_content = $event.target.value"
      ></ion-textarea>
      <ion-button shape="block" color="tertiary" @click="submit_post()">
        문의하기
      </ion-button>
    </ion-content>
  </div>
</template>

<script>
import store from '@/store/index';
import ModalHeader from '@/components/common/ModalHeader';
import { createReport, getBlacklist } from '@/api/report';
import { toastErrorController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '1 : 1 문의',
      re_title: null,
      re_content: null,
      re_category: null,
      re_bl_id: null,
      re_bl_lists: null,
    };
  },
  async mounted() {
    console.log(this.us_id);
    const { data } = await getBlacklist(this.us_id);
    this.re_bl_lists = data.info;
    console.log(this.re_bl_lists);
  },
  methods: {
    async submit_post() {
      const data = {
        re_us_id: this.us_id,
        re_title: this.re_title,
        re_content: this.re_content,
        re_category: this.re_category,
      };
      if (this.re_category == '계정정지') data.re_bl_id = this.re_bl_id;
      console.log('getData: ', data);
      try {
        await createReport(data);
        this.$ionic.modalController.dismiss();
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
};
</script>

<style></style>
