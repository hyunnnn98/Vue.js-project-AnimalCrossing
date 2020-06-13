<template>
  <ul class="myReview info-bcg">
    <template v-if="review_info != ''">
      <li class="talk-box" v-for="(review, i) of review_info" :key="i">
        <div class="talk-avater">
          <img :src="`${review.user.us_thumbnail}`" alt="썸네일" />
        </div>
        <div class="talk-content">
          <p class="talk-title">{{ review.user.us_nickname }}</p>
          <p class="info-review">{{ review.rv_content }}</p>
          <div class="talk-sub">
            <p v-for="rate of review.rv_rates" class="info-rate" :key="rate">
              <img v-if="rate == 0" src="../../imgs/star_on.png" alt="" />
              <img v-else src="../../imgs/star_off.png" alt="" />
            </p>
            <p class="info-date">{{ review.createdAt }}</p>
          </div>
        </div>
      </li>
    </template>
    <li class="talk-nodata" v-else>
      <img src="../../imgs/star_on.png" alt="" />
      거래 후기가 없습니다.
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
    // 리뷰 데이터 불러오기 이벤트
    try {
      const { data } = await getReview(this.us_id);
      let rv_rates;
      await data.info.forEach(v => {
        v.createdAt = review_Format(v.createdAt);
        rv_rates = [1, 1, 1, 1, 1];
        for (let i = 0; i < v.rv_rate; i++) {
          rv_rates[i] = 0;
        }
        v.rv_rates = rv_rates;
      });

      this.review_info = data.info;
    } catch (err) {
      toastErrorController(this.$ionic, err);
    }
  },
};
</script>

<style></style>
