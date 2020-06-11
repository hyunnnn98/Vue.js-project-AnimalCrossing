<template>
  <div class="searchInput">
    <ion-icon name="list" @click="openModal"></ion-icon>
    <ion-item>
      <ion-input
        :value="myInput"
        @input="myInput = $event.target.value"
        @keyup="getPostItem"
        placeholder="찾고싶은 아이템을 검색해 보세요"
      ></ion-input>
    </ion-item>
    <div class="search" @click="handelClick"></div>
    <ul v-if="myInput != ''">
      <li v-for="(post, index) in searchedPosts" :key="index">
        {{ post.bo_title }}
      </li>
    </ul>
  </div>
</template>

<script>
import CategoryModal from './CategoryModal.vue';
import { searchPost } from '@/api/post';
import { toastErrorController } from '@/utils/toastController';

export default {
  name: 'SearchBar',
  data() {
    return {
      myInput: '',
      searchedPosts: '',
    };
  },
  props: {
    category: {
      type: Array,
    },
  },
  methods: {
    handelClick() {
      //TODO 검색버튼 말고 새로고침 버튼으로 넣으면 어떨까?
    },
    async getPostItem(key) {
      // console.log(key);
      try {
        const { data } = await searchPost(this.myInput);
        this.searchedPosts = data.info;
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    async openModal() {
      let modal = await this.$ionic.modalController.create({
        component: CategoryModal,
        cssClass: 'category-modal-css',
        componentProps: {
          propsData: {
            categorys: this.category,
          },
        },
      });

      await modal.present();

      let selectRes = await modal.onDidDismiss();
    },
  },
};
</script>

<style></style>
