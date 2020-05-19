<template>
  <div class="Category">
    <ion-tab-button @click="openModal">
      <ion-icon name="list"></ion-icon>
      <ion-label>카테고리</ion-label>
    </ion-tab-button>
  </div>
</template>

<script>
import CategoryModal from './CategoryModal.vue';

export default {
  methods: {
    async openModal() {
      let modal = await this.$ionic.modalController.create({
        component: CategoryModal,
        componentProps: {
          data: {
            content: 'New Content',
          },
          propsData: {
            title: 'New title',
          },
        },
      });

      await modal.present();

      let selectRes = await modal.onDidDismiss();

      if (selectRes.data && selectRes.data.success)
        alert(JSON.stringify(selectRes, null, 2));
    },
  },
};
</script>

<style>
.Category {
  border-bottom: 1px solid #e0e0e0;
  height: 50px;
}
</style>
