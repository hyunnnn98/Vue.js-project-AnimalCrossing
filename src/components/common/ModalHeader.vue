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
ion-toolbar {
  height: 100px;
}

ion-title {
  font-family: '뽀로로';
  text-align: center;
  line-height: 100px;
  font-size: 3em;
  color: rgb(0, 0, 0);
}
</style>
