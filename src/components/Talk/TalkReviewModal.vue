<template>
  <div class="modal-review">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ul class="qu-start-point">
        <p>별점으로 거래만족도를 표현해주세요.</p>
        <li
          @click="rate_up(index)"
          v-for="(rate, index) of rv_rates"
          :key="index"
        >
          <img v-if="rate == 0" src="../../imgs/star_on.png" alt="" />
          <img v-else src="../../imgs/star_off.png" alt="" />
        </li>
        <!-- <li v-for=""></li> -->
      </ul>
      <ion-item>
        <ion-label position="floating"><span>*</span> 한줄평 남기기</ion-label>
        <ion-input
          :value="rv_content"
          @input="rv_content = $event.target.value"
          clear-on-edit="true"
          placeholder="판매자에 대한 솔직한 후기는 다음 거래에 많은 도움이 됩니다."
        ></ion-input>
      </ion-item>
      <div class="ani-btn sky" @click="update_review()">작성완료</div>
    </ion-content>
  </div>
</template>

<script>
import ModalHeader from '@/components/common/ModalHeader';
import { createReview } from '@/api/review';
import { toastController, toastErrorController } from '@/utils/toastController';

export default {
  props: ['us_id', 'ch_ro_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '거래후기 작성',
      rv_content: '',
      rv_rates: [0, 0, 0, 0, 0],
      rv_rate: 5,
    };
  },
  methods: {
    async update_review() {
      try {
        // 거래 후기 작성
        const result = await createReview({
          us_id: this.us_id,
          ro_id: this.ch_ro_id,
          rv_content: this.rv_content,
          rv_rate: this.rv_rate,
        });
        toastController(
          this.$ionic,
          '거래 후기 작성을 완료하였습니다!',
          'success',
        );
        this.$ionic.modalController.dismiss();
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    rate_up(number) {
      // 사용자 클릭에 따른 별 개수 변화.
      this.rv_rates = [0, 0, 0, 0, 0];
      this.rv_rate = 5;
      for (let i = 0; i < 5; i++) {
        if (i <= number) this.rv_rates[i] = 0;
        else {
          this.rv_rates[i] = 1;
          this.rv_rate--;
        }
      }
    },
  },
};
</script>

<style></style>
