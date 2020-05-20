<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title
          >카테고리
          <span class="backUrl" @click="modalClose(false)"> 뒤로가기</span>
        </ion-title>
        <!-- <ion-tab-button>
          <ion-label>뒤로가기</ion-label>
        </ion-tab-button> -->
      </ion-toolbar>
    </ion-header>
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
.backUrl {
  /* background-color: red; */
  position: absolute;
  top: 3px;
  right: 10px;
  font-size: 0.7em;
  cursor: pointer;
}
</style>
