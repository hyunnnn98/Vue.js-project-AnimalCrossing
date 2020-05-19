<template>
  <div>
    <SearchBar></SearchBar>
    <NoticeTabs></NoticeTabs>
    <CategoryTabs></CategoryTabs>
    <ul>
      <ItemBox></ItemBox>
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
};
</script>
