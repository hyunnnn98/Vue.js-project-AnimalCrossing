<template>
  <div class="Category">
    <ion-icon name="list" @click="openModal"></ion-icon>
  </div>
</template>

<script>
import CategoryModal from './CategoryModal.vue';

export default {
  name: 'category_tab',
  props: {
    category: {
      type: Array,
    },
  },
  methods: {
    async openModal() {
      let modal = await this.$ionic.modalController.create({
        component: CategoryModal,
        componentProps: {
          data: {
            content: 'New Content',
          },
          propsData: {
            categorys: this.category,
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
  background-color: white;
}

.Category ion-icon {
  width: 30px;
  height: 30px;
  margin-top: 0.7em;
  margin-left: 1em;
  cursor: pointer;
}
</style>
