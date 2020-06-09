<template>
  <ul class="myReview">
    <li class="talk-box">
      <div class="talk-avater">
        <img src="../../imgs/tanuki.png" alt="썸네일" />
      </div>
      <div class="talk-content">
        <p class="talk-title">너굴**</p>
        <p class="info-review">싸게 거래해주네요!!</p>
        <p class="info-date">2020년 05월 02일</p>
      </div>
    </li>
    <li class="talk-box">
      <div class="talk-avater">
        <img src="../../imgs/tanuki.png" alt="썸네일" />
      </div>
      <div class="talk-content">
        <p class="talk-title">개발*****</p>
        <p class="info-review">싸게 거래해주네요!!</p>
        <p class="info-date">2020년 05월 02일</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { getReview } from '@/api/review';

export default {
  props: ['us_id'],
  async mounted() {
    const { data } = await getReview(this.us_id);
    console.log(data);
  },
};
</script>

<style></style>
