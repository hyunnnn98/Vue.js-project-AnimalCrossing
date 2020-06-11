<template>
  <div class="modal-report">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding ta-body">
      <ion-label position="floating">
        <span>*</span> 허위 신고에 따른 처벌은 엄중히 처리합니다.
      </ion-label>
      <ion-textarea
        placeholder="당시 상황을 자세히 적어주세요."
        class="talk-textarea"
        :value="bl_content"
        @input="bl_content = $event.target.value"
      ></ion-textarea>
      <ion-button
        shape="block"
        fill="outline"
        color="danger"
        @click="submit_post()"
      >
        신고 접수
      </ion-button>
    </ion-content>
  </div>
</template>

<script>
import store from '../../store/index';
import router from '../../router/index';
import ModalHeader from '@/components/common/ModalHeader';
import { toastController } from '@/utils/toastController';

export default {
  props: ['us_id', 'ro_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '신고하기',
      bl_content: '',
    };
  },
  methods: {
    modalClose() {
      this.$ionic.modalController.dismiss();
    },
    submit_post() {
      //TODO 토스트메세지 통한 벨리데이션 검사필요.
      if (this.bl_content == '')
        return toastController(this.$ionic, '내용을 입력해주세요.', 'danger');
      else if (this.bl_content.length < 20)
        return toastController(
          this.$ionic,
          '20글자 이상 자세한 내용을 적어주세요',
          'warning',
        );
      console.log('클릭!');
      store.state.socket.emit(
        'set_blacklist',
        this.us_id,
        this.ro_id,
        this.bl_content,
      );
      toastController(
        this.$ionic,
        '신고가 접수되었습니다. 문의에 대한 답변은\n 내정보 - 1:1 문의내역에서 확인하실 수 있습니다.',
        'success',
      );
      router.push('/talk');
      this.modalClose();
    },
  },
};
</script>

<style></style>
