<template>
  <div>
    <SearchBar></SearchBar>
    <div class="home-body">
      <NoticeTabs></NoticeTabs>
      <CategoryTabs></CategoryTabs>
      <ul class="item-container">
        <ItemBox v-for="item in items" :key="item"></ItemBox>
        <li class="itme-ad">다음페이지로 넘어가기</li>
        <li class="itme-ad">광고영역</li>
      </ul>
    </div>
    <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button size="small" color="success">
        <ion-icon @click="logScrollStart" name="arrow-up"></ion-icon>
      </ion-fab-button>
    </ion-fab> -->
  </div>
</template>

<script>
import SearchBar from '@/components/Home/SearchBar.vue';
import NoticeTabs from '@/components/Home/NoticeTabs.vue';
import CategoryTabs from '@/components/Home/CategoryTabs.vue';
import ItemBox from '@/components/Home/ItemBox.vue';

export default {
  components: {
    SearchBar,
    NoticeTabs,
    CategoryTabs,
    ItemBox,
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    };
  },
  methods: {
    scrollToTop() {
      console.log('클릭!');

      const tag = document.querySelector('.searchInput');
      console.log(tag);

      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: tag.offsetTop,
      });
    },
  },
};
</script>

<style>
.item-container {
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  background-color: rgb(233, 232, 232);
  width: 100%;
  /* height: 900px; */
  /* overflow-y: scroll; */
}

.item-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.home-body {
  overflow-y: scroll;
  max-width: none;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translateX(-50%) translateY(-50%);
}

.home-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.itme-ad {
  display: block;
  width: 100%;
  color: white;
  text-align: center;
  /* height: 20px; */
  background-color: #558bee;
  margin: 5px 3px;
  padding: 10px;
}

.item-container > li:nth-last-child(2) {
  border-radius: 8px;
}
</style>
