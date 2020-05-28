<template>
  <div>
    <div class="pi-imgs">
      <img src="../../imgs/logo.jpg" alt="" />
    </div>
    <div class="pi-contents">
      <div class="pi-price">{{ item_data.bo_cost }}<span>벨</span></div>
      <div class="pi-title">{{ item_data.bo_title }}</div>
      <div class="pi-info">
        <span class="pi-">13:11</span>
        <span class="pi-view">조회수 {{ item_data.bo_show }}</span>
        <span class="pi-like"
          ><img src="../../imgs/like.png" alt="좋아요" />
          {{ item_data.bo_like }}</span
        >
        <span class="pi-bad"
          ><img src="../../imgs/bad.png" alt="좋아요" />
          {{ item_data.bo_hate }}</span
        >
      </div>
      <div class="pi-content">
        {{ item_data.bo_content }}
        <!-- 상품 설명 들어갈 예정, 상품 설명 들어갈 예정상품 설명 들어갈 예정상품
        설명 들어갈 예정상품 설명 들어갈 예정
        {{ item_data }} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item_data'],
  data() {
    return {};
  },
};
</script>

<style></style>
