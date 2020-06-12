<template>
  <div class="searchInput">
    <ion-icon name="list" @click="openCategoryModal"></ion-icon>
    <ion-item>
      <ion-input
        :value="myInput"
        @input="myInput = $event.target.value"
        @keyup="getPostItem"
        placeholder="찾고싶은 아이템을 검색해 보세요"
      ></ion-input>
    </ion-item>
    <div @click="refreshPost" class="refresh"></div>
    <ul class="search-container" v-if="myInput != ''">
      <li
        @click="openItemModal(post.bo_id)"
        v-for="(post, index) in searchedPosts"
        :key="index"
      >
        {{ post.bo_title }}
      </li>
    </ul>
  </div>
</template>

<script>
import CategoryModal from './CategoryModal.vue';
import ItemPage from '@/views/ItemPage';
import { searchPost, setPostView } from '@/api/post';
import { toastErrorController } from '@/utils/toastController';
import { EventBus } from '@/utils/bus';

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
    refreshPost() {
      EventBus.$emit('refresh-post');
      const tag = document.querySelector('.home-body');
      tag.scrollToTop(400);
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
    async openCategoryModal() {
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
    async openItemModal(bo_id) {
      await setPostView(bo_id);
      const us_id = this.$store.state.us_id;

      let modal = await this.$ionic.modalController.create({
        component: ItemPage,
        cssClass: 'item-modal-css',
        componentProps: {
          propsData: {
            bo_id,
            us_id,
          },
        },
      });

      modal.present();
    },
  },
};
</script>

<style></style>
