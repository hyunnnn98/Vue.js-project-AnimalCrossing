<template>
  <div class="category">
    <div class="category-container">
      <div class="category-menu">
        <div @click="change_categroy(0)">
          전체보기
        </div>
        <div @click="change_categroy(1)">
          판매
        </div>
        <div @click="change_categroy(2)">
          구매
        </div>
        <div @click="change_categroy(3)">교환</div>
      </div>
      <p :class="`_${category_value}`" class="category-progress"></p>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';

export default {
  name: 'category_tab',
  data() {
    return {
      category_value: 0,
    };
  },
  created() {
    EventBus.$on('redirect_category', ctg_index => {
      this.category_value = 0;
    });
  },
  destroyed() {
    EventBus.$off('redirect_category');
  },
  methods: {
    // 대표 카테고리 변경 이벤트
    change_categroy(ctg_index) {
      this.category_value = ctg_index;
      EventBus.$emit('change_category', ctg_index);
    },
  },
};
</script>

<style>
.category {
  border-top: 1px solid #e0e0e0;
  height: 50px;
  background-color: white;
  background-color: #f8f8f0;
}

.category-container {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}

.category-menu {
  display: flex;
  justify-content: space-around;
  /* flex-wrap: wrap; */
  text-align: center;
}

.category-menu > div {
  /* flex-basis: 33%; */
  width: 100%;
  flex-shrink: 1;
  padding: 15px;
  /* border-bottom: 1px solid rgb(116, 116, 116); */
}

.category-progress {
  position: relative;
  width: 25%;
  border-bottom: 2px solid rgb(2, 129, 61);
  transition: all 0.3s ease;
}

.category-progress._0 {
  left: 0px;
}

.category-progress._1 {
  left: 25%;
}

.category-progress._2 {
  left: 50%;
}

.category-progress._3 {
  left: 75%;
}
</style>
