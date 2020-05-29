<template>
  <li @click="get_postData(item.bo_id)" class="itembox">
    <div class="post-title">
      <span class="post-category" :class="`id_${item.bo_category}`">{{
        item.category.ca_contents
      }}</span>
      {{ item.bo_title }}
    </div>
    <div class="post-contents">
      <span class="post-contents post_user">
        <span class="post-contents nick_name">{{ item.user.us_nickname }}</span>
        <span class="post-contents rank">{{ item.user.us_grant }}</span>
        <span class="post-contents like">
          <img src="../../imgs/like.png" alt="좋아요" />{{ item.bo_like }}
        </span>
        <span class="post-contents bad">
          <img src="../../imgs/bad.png" alt="싫어요" />{{ item.bo_hate }}
        </span>
      </span>
      <span class="post-contents post_info">
        <span class="post-contents time">{{ item.createdAt }}</span>
        <span class="post-contents clicked">조회 {{ item.bo_view }}</span>
      </span>
    </div>
    <div class="post-price">
      {{ item.bo_cost }} {{ item.bo_cost_selector == 0 ? '벨' : '마일' }}
    </div>
    <div class="post-price"></div>
  </li>
</template>

<script>
import { setPostView } from '@/api/post';
export default {
  name: 'ItemBox',
  props: ['item'],
  data() {
    return {};
  },
  methods: {
    get_postData(bo_id) {
      // console.log(bo_id);
      setPostView(bo_id);
      this.$router.push(`/main/${bo_id}`);
    },
  },
};
</script>

<style>
.itembox {
  position: relative;
  flex-grow: 1;
  width: 350px;
  height: 80px;
  margin: 5px 3px;
  padding: 10px 20px;
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  letter-spacing: -1px;
}

.post-title {
  font-size: 1.5em;
  font-weight: 900;
  padding: 5px 0;
  color: rgb(73, 73, 73);
}

.post-category {
  padding: 0 5px;
  background-color: black;
  color: white;
  border-radius: 3px;
}

.post-category.id_1 {
  background-color: rgb(240, 70, 3);
}

.post-category.id_2 {
  background-color: rgb(3, 240, 121);
}

.post-category.id_4 {
  background-color: rgb(162, 91, 221);
}

.post-contents.post_info,
.post-contents.post_user {
  position: absolute;
  bottom: 13px;
}

.post-contents.post_user > span {
  margin-right: 0.5em;
}

.post-contents.post_info {
  right: 40px;
}

.post-contents.rank {
  color: rgb(240, 240, 3);
}

.post-contents.like > img,
.post-contents.bad > img {
  padding-right: 3px;
}

.post-contents.time {
  padding: 0px 10px;
}

.post-price {
  position: absolute;
  right: 40px;
  top: 5px;
  font-size: 2.3em;
  font-weight: 900;
  letter-spacing: -3.5px;
}

@media (min-width: 710px) {
  .itembox {
    width: 300px;
    height: 200px;
  }
}
</style>
