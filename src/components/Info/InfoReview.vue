<template>
  <ul class="myReview info-bcg">
    <li class="talk-box" v-for="(review, i) of review_info" :key="i">
      <div class="talk-avater">
        <img :src="`${review.user.us_thumbnail}`" alt="썸네일" />
      </div>
      <div class="talk-content">
        <p class="talk-title">{{ review.user.us_nickname }}</p>
        <p class="info-review">{{ review.rv_content }}</p>
        <p class="info-date">{{ review.createdAt }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { getReview } from '@/api/review';
import { review_Format } from '@/utils/dateFormat';
import { toastErrorController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  data() {
    return {
      review_info: '',
    };
  },
  async mounted() {
    try {
      const { data } = await getReview(this.us_id);
      await data.info.forEach(v => {
        v.createdAt = review_Format(v.createdAt);
      });

      this.review_info = data.info;
    } catch (err) {
      toastErrorController(this.$ionic, err);
    }
  },
};
</script>

<style></style>
