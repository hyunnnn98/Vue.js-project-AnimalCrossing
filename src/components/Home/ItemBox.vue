<template>
  <li class="itembox">
    <div class="post-title">
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
    <div class="post-price">{{ item.bo_cost }} {{ item.bo_cost_selector }}</div>
    <div class="post-price"></div>
  </li>
</template>

<script>
export default {
  name: 'ItemBox',
  props: ['item'],
  mounted() {
    console.log(this.item);
  },
  data() {
    return {};
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
