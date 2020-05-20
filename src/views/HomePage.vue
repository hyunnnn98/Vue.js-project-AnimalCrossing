<template>
  <div>
    <SearchBar></SearchBar>
    <NoticeTabs></NoticeTabs>
    <CategoryTabs></CategoryTabs>
    <ul class="item-container ">
      <ItemBox v-for="item in items" :key="item"></ItemBox>
    </ul>
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
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    };
  },
};
</script>

<style>
.item-container {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(233, 232, 232);
  height: 500px;
  overflow-y: scroll;
}
.item-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
