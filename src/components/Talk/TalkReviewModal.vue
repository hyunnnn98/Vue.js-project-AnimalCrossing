<template>
  <div class="modal-review">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label position="floating"><span>*</span> 한줄평 남기기</ion-label>
        <ion-input
          :value="rv_content"
          @input="rv_content = $event.target.value"
          clear-on-edit="true"
          placeholder="판매자에 대한 솔직한 후기는 다음 거래에 많은 도움이 됩니다."
        ></ion-input>
      </ion-item>
      <ion-button shape="block" color="tertiary" @click="update_review()">
        작성완료
      </ion-button>
    </ion-content>
  </div>
</template>

<script>
import ModalHeader from '@/components/common/ModalHeader';
import { createReview } from '@/api/review';
import { toastController } from '@/utils/toastController';

export default {
  props: ['us_id', 'room_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '거래후기 작성',
      rv_content: '',
      rv_rate: '',
    };
  },
  methods: {
    async update_review() {
      //TODO 리뷰 평점 버튼 만들기.
      const result = await createReview({
        us_id: this.us_id,
        ch_room_id: this.room_id,
        rv_content: this.rv_content,
        rv_rate: this.rv_rate,
      });
      if (result) this.$ionic.modalController.dismiss();
      else toastController('네트워크 에러로 1:1 문의 전송에 실패했습니다.');
    },
  },
};
</script>

<style></style>
