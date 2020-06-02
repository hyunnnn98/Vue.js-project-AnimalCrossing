<template>
  <div>
    <div class="pi-imgs">
      <ion-slides>
        <ion-slide v-if="item_data.image.length == 0">
          <img
            src="https://deac-project.s3.ap-northeast-2.amazonaws.com/web-source/icon.png"
          />
        </ion-slide>
        <ion-slide v-else v-for="(img, index) in item_data.image" :key="index">
          <img :src="`${img.im_location}`" />
        </ion-slide>
      </ion-slides>
    </div>
    <div class="pi-contents">
      <div class="pi-price">
        {{ item_data.bo_cost
        }}<span>{{ item_data.bo_cost_selector == 0 ? '덩' : '마일' }}</span>
      </div>
      <div class="pi-title">{{ item_data.bo_title }}</div>
      <div class="pi-info">
        <span class="pi-">{{ item_data.createdAt }}</span>
        <span class="pi-view">조회수 {{ item_data.bo_view }}</span>
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

<style>
.pi-imgs {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition-duration: 0.5s;
  background-color: black;
}

.pi-imgs:hover {
  max-width: 100%;
  height: 100%;
}

.pi-imgs img {
  width: auto;
}
</style>
