<template>
  <!-- <li @click="get_postData(item.bo_id)" class="itembox"> -->
  <li @click="openModal(item.bo_id)" class="itembox">
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
    <div class="post-thumbnail">
      <img
        v-if="item.bo_thumbnail === '6'"
        src="../../imgs/tanuki.png"
        alt="기본 썸네일"
      />
      <img v-else :src="item.bo_thumbnail" alt="썸네일" />
    </div>
    <div class="post-price">
      {{ item.bo_cost }} {{ item.bo_cost_selector == 0 ? '벨' : '마일' }}
    </div>
  </li>
</template>

<script>
import ItemPage from '@/views/ItemPage';

import { setPostView } from '@/api/post';
export default {
  name: 'ItemBox',
  props: ['item'],
  data() {
    return {};
  },
  methods: {
    get_postData(bo_id) {
      setPostView(bo_id);
      this.$router.push(`/main/${bo_id}`);
    },

    async openModal(bo_id) {
      let modal = await this.$ionic.modalController.create({
        component: ItemPage,
        cssClass: 'item-modal-css',
        componentProps: {
          propsData: {
            bo_id,
          },
        },
      });

      await modal.present();

      let selectRes = await modal.onDidDismiss();
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
  padding: 10px 10px;
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  letter-spacing: -1px;
}

.post-title {
  font-size: 1.3em;
  font-weight: 900;
  padding: 5px 0;
  color: rgb(73, 73, 73);
}

.post-category {
  font-size: 0.9em;
  padding: 4px 5px;
  background-color: black;
  color: white;
  border-radius: 3px;
}

.post-category.id_1 {
  background-color: rgb(240, 70, 3);
}

.post-category.id_2 {
  background-color: rgb(3, 211, 107);
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
  right: 20px;
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
  font-family: '여기어때 잘난체';
  position: absolute;
  right: 20px;
  top: 15px;
  color: rgb(71, 71, 71);
  font-size: 1.8em;
  font-weight: 900;
  letter-spacing: -2px;
}

.post-thumbnail {
  display: none;
  width: 110px;
  height: 110px;
  position: absolute;
  top: 50px;
  left: 20px;
  border: 2px solid rgb(160, 160, 160);
  overflow: hidden;
}

.post-thumbnail > img {
  width: 100%;
  height: 100%;
}

@media (min-width: 710px) {
  .itembox {
    width: 300px;
    height: 200px;
  }

  .post-price {
    font-size: 2.2em;
    top: 130px;
  }

  .post-thumbnail {
    display: block;
  }

  .post-category {
    position: absolute;
    top: -15px;
    left: 10px;
    padding: 2px 5px;
  }

  .post-category {
    font-size: 1em;
  }
}
</style>
