<template>
  <div class="Category">
    <ion-icon name="list" @click="openModal"></ion-icon>
    <!-- <div class="Top_Category">
      <span>입양 / 분양</span>
      <span>아이템</span>
      <span>무주식</span>
    </div> -->
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
  /* line-height: 50px; */
  background-color: white;
}

.Top_Category {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.Category > span {
  display: inline-block;
}

.Category ion-icon {
  width: 30px;
  height: 30px;
  margin-top: 0.7em;
  margin-left: 1em;
  cursor: pointer;
}
</style>
