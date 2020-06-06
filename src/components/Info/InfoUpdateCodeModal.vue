<template>
  <div class="modal-category">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label><span>*</span> 통신코드</ion-label>
        <ion-input
          :value="us_code"
          @input="us_code = $event.target.value"
          clear-on-edit="true"
          placeholder="- 는 생락하고 입력해주세요."
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

<style>
.modal-category {
  padding: 20px 5px;
}

.modal-category ion-title {
  text-align: center;
  height: 30px;
  line-height: 20px;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -2px;
}

.backUrl {
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 1.3em;
  cursor: pointer;
  color: rgb(0, 0, 0);
}

.info-textarea {
  border: 1.5px solid #e0e0e0;
  margin-top: 1em;
  margin-bottom: 1em;
}

.info-textarea > textarea {
  height: 350px;
  text-indent: 0px;
}

.qu-body span {
  color: rgb(255, 102, 0);
}

.code-modal-css {
  --width: 100% !important;
  --height: 35% !important;
}

@media only screen and (min-height: 600px) and (min-width: 768px) {
  .code-modal-css {
    --width: 50% !important;
    --height: 35% !important;
    --max-width: 600px;
  }
}
</style>
