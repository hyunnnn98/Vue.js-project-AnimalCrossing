<template>
  <div class="modal-category">
    <ion-toolbar>
      <ion-title>
        카테고리
        <ion-icon
          class="backUrl"
          name="close-circle"
          @click="modalClose(false)"
        ></ion-icon>
      </ion-title>
      <!-- <ion-tab-button>
          <ion-label>뒤로가기</ion-label>
        </ion-tab-button> -->
    </ion-toolbar>

    <ion-content class="ion-padding">
      <ul>
        <li
          @click="selectMenu(category.ca_id)"
          v-for="category in categorys"
          :key="category.ca_id"
        >
          {{ category.ca_contents }}
        </li>
      </ul>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';

export default {
  name: 'category_modal',
  data() {
    return {
      select: null,
    };
  },
  props: {
    categorys: {
      type: Array,
    },
  },
  created() {
    EventBus.$on('category_list', category => {
      this.category = category;
      console.log('이벤트버스로 받은 카테고리:', category);
    });
  },
  methods: {
    selectMenu(menu) {
      console.log(menu);
      this.select = menu;
      this.modalClose(true);
    },
    modalClose(selectCategory) {
      let clickResponse = {
        success: selectCategory,
        selectData: selectCategory ? this.select : null,
      };
      this.$ionic.modalController.dismiss(clickResponse);
    },
  },
};
</script>

<style>
.modal-category ion-title {
  /* background-color: red; */
  text-align: center;
}

.backUrl {
  /* background-color: red; */
  position: absolute;
  top: -5px;
  right: 10px;
  font-size: 1.3em;
  cursor: pointer;
  color: rgb(47, 179, 14);
}
</style>
