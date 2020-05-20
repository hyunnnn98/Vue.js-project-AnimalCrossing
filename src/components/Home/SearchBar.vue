<template>
  <div>
    <ion-item>
      <ion-label position="floating">찾고싶은 아이템을 검색해 보세요</ion-label>
      <ion-input
        :value="myInput"
        @input="myInput = $event.target.value"
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
header {
  /* background-color: red; */
  height: 50px;
  line-height: 50px;
  padding: 0 40px;
  border-bottom: 1px solid #e0e0e0;
}

.search {
  position: absolute;
  top: 10px;
  right: 15px;
  height: 32px;
  width: 32px;
  color: white;
  background-image: url('../../imgs/search.png');
  background-size: contain;
  cursor: pointer;
  z-index: 1000000;
}
</style>
