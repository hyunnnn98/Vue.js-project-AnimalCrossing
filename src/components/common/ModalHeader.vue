<template>
  <ion-toolbar>
    <ion-title class="modal-title">
      {{ modal_title }}
      <ion-icon
        class="backUrl"
        name="close-circle"
        @click="modalClose()"
      ></ion-icon>
    </ion-title>
  </ion-toolbar>
</template>

<script>
export default {
  name: 'ModalHeader',
  props: ['modal_title'],
  methods: {
    modalClose() {
      this.$ionic.modalController.dismiss();
    },
  },
};
</script>

<style>
ion-title {
  font-family: '뽀로로';
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 4em;
  color: white;
}

.backUrl {
  position: absolute;
  right: 20px;
  font-size: 25px !important;
  cursor: pointer;
  color: rgb(0, 0, 0);
}
</style>
