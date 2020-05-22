<template>
  <div class="searchInput">
    <ion-item>
      <!-- <ion-label position="floating">찾고싶은 아이템을 검색해 보세요</ion-label> -->
      <ion-input
        :value="myInput"
        @input="myInput = $event.target.value"
        placeholder="찾고싶은 아이템을 검색해 보세요"
      ></ion-input>
    </ion-item>
    <div class="search" @click="handelClick"></div>
  </div>
  <!-- <div>찾고싶은 아이템을 검색해 보세요</div> -->
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      myInput: '',
    };
  },
  methods: {
    handelClick() {
      alert(this.myInput);
      this.myInput = '';
    },
  },
};
</script>

<style>
.searchInput {
  position: absolute;
  width: 100%;
  background-color: white !important;
  z-index: 10000000000;
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
}
</style>
