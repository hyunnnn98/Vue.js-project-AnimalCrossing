<template>
  <div class="modal-updateCode">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label><span>*</span> 통신코드</ion-label>
        <ion-input
          type="number"
          :value="us_code"
          @input="us_code = $event.target.value"
          placeholder="- 는 생략하고 입력해주세요."
        ></ion-input>
      </ion-item>
      <div class="ani-btn sky" @click="update_code()">수정완료</div>
    </ion-content>
  </div>
</template>

<script>
import ModalHeader from '@/components/common/ModalHeader';
import { changeCode } from '@/api/report';
import { toastController, toastErrorController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '통신코드 수정하기',
      us_code: '',
    };
  },
  methods: {
    async update_code() {
      if (this.us_code.length != 12)
        return toastController(
          this.$ionic,
          '[통신코드] 12자리 형식을 맞춰주세요.',
          'warning',
        );
      try {
        await changeCode({
          us_id: this.us_id,
          us_code: this.us_code,
        });
        this.$ionic.modalController.dismiss();
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
};
</script>

<style></style>
