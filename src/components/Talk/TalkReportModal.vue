<template>
  <div class="modal-category">
    <ion-toolbar>
      <ion-title class="modal-title">
        신고하기
        <ion-icon
          class="backUrl"
          name="close-circle"
          @click="modalClose()"
        ></ion-icon>
      </ion-title>
    </ion-toolbar>

    <ion-content class="ion-padding">
      <ion-label position="floating">
        * 허위 신고에 대한 처벌은 엄중히 처리합니다.
      </ion-label>
      <ion-textarea
        placeholder="당시 상황을 자세히 적어주세요."
        class="talk-textarea"
        :value="bl_content"
        @input="bl_content = $event.target.value"
      ></ion-textarea>
      <ion-button shape="block" color="danger" @click="submit_post()">
        신고 접수
      </ion-button>
    </ion-content>
  </div>
</template>

<script>
import store from '../../store/index';

export default {
  props: ['us_id', 'room_id'],
  data() {
    return {
      bl_content: '',
    };
  },
  methods: {
    modalClose() {
      this.$ionic.modalController.dismiss();
    },
    submit_post() {
      console.log('클릭!');
      store.state.socket.emit(
        'set_blacklist',
        this.us_id,
        this.room_id,
        this.bl_content,
      );
      this.modalClose();
    },
  },
};
</script>

<style>
.modal-category {
  padding: 20px 10px;
}

.modal-category ion-title {
  /* background-color: red; */
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

.talk-textarea {
  border: 1.5px solid rgb(121, 121, 121);
  margin-bottom: 1em;
}

.talk-textarea > textarea {
  height: 400px;
  text-indent: 0px;
}
</style>
