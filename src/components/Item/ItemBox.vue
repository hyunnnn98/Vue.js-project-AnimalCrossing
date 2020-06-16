<template>
  <li @click="openModal(item.bo_id)" class="itembox">
    <div class="post-title">
      <span class="post-category" :class="`id_${item.bo_category}`">{{
        item.category.ca_contents
      }}</span>
      {{ item.bo_title }}
    </div>
    <div v-if="item" class="post-contents">
      <span class="post-contents post_user">
        <span
          class="post-contents status"
          :class="item.bo_trade_status == 0 ? '_0' : '_1'"
        >
          {{ item.bo_trade_status == 0 ? '거래가능' : '거래완료' }}
        </span>
        <span class="post-contents nick_name">{{ item.user.us_nickname }}</span>
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
      {{ item.bo_cost }} {{ item.bo_cost_selector == 0 ? '덩' : '마일' }}
    </div>
  </li>
</template>

<script>
import ItemPage from '@/views/ItemPage';

import { setPostView } from '@/api/post';
export default {
  name: 'ItemBox',
  props: ['item'],

  methods: {
    // 아이템 상세보기 모달 open 이벤트
    async openModal(bo_id) {
      await setPostView(bo_id);
      const us_id = this.$store.state.us_id;

      let modal = await this.$ionic.modalController.create({
        component: ItemPage,
        cssClass: 'item-modal-css',
        componentProps: {
          propsData: {
            bo_id,
            us_id,
          },
        },
      });

      modal.present();
    },
  },
};
</script>

<style></style>
