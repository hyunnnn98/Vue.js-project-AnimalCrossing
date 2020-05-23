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
        <li @click="selectMenu(menu)" v-for="menu in menus" :key="menu">
          {{ menu }}
        </li>
      </ul>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      select: null,
      menus: ['입양 / 분양', '아이템', '만지작', '알바', '무료나눔'],
    };
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
