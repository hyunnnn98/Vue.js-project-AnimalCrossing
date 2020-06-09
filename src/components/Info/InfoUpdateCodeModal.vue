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
          clear-on-edit="true"
          placeholder="- 는 생략하고 입력해주세요."
        ></ion-input>
      </ion-item>
      <ion-button shape="block" color="tertiary" @click="update_code()">
        수정완료
      </ion-button>
    </ion-content>
  </div>
</template>

<script>
import ModalHeader from '@/components/common/ModalHeader';
import { changeCode } from '@/api/report';
import { toastController } from '@/utils/toastController';

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
      //TODO 통신코드 - 빼고 파싱하기

      const result = await changeCode({
        us_id: this.us_id,
        us_code: this.us_code,
      });
      if (result) this.$ionic.modalController.dismiss();
      else toastController('네트워크 에러로 1:1 문의 전송에 실패했습니다.');
    },
  },
};
</script>

<style></style>
