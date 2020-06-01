<template>
  <div class="searchInput">
    <ion-item>
      <ion-input
        :value="myInput"
        @input="myInput = $event.target.value"
        @keyup="getPostItem"
        placeholder="찾고싶은 아이템을 검색해 보세요"
      ></ion-input>
    </ion-item>
    <div class="search" @click="handelClick"></div>
    <ul>
      <li v-for="(post, index) in searchedPosts" :key="index">
        {{ post.bo_title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { searchPost } from '@/api/post';

export default {
  name: 'SearchBar',
  data() {
    return {
      myInput: '',
      searchedPosts: '',
    };
  },
  methods: {
    handelClick() {
      alert(this.myInput);
      this.myInput = '';
    },
    async getPostItem(key) {
      // console.log(key);
      const { data } = await searchPost(this.myInput);
      console.log('검색된 데이터 :', data.info);
      this.searchedPosts = data.info;
    },
  },
};
</script>

<style>
.searchInput {
  position: absolute;
  width: 100%;
  background-color: white !important;
  z-index: 10000;
}

.search {
  position: absolute;
  top: 7px;
  right: 15px;
  height: 32px;
  width: 32px;
  color: white;
  background-image: url('../../imgs/search.png');
  background-size: contain;
  cursor: pointer;
  z-index: 20000;
}
</style>
