<template>
  <ion-content class="post">
    <AppHeader :head_name="title"></AppHeader>
    <ItemInfo v-if="bo_data" :item_data="this.bo_data.info"></ItemInfo>
    <div class="post-container">
      <span class="item-info">판매자정보</span>
      <InfoContent
        v-if="bo_data"
        :us_info="this.bo_data.info.user"
      ></InfoContent>
      <span class="item-info">후기정보</span>
      <InfoReview v-if="bo_data" :us_id="bo_us_id"></InfoReview>
    </div>
    <ItemFooter v-if="bo_data" :us_id="us_id" :item_data="this.bo_data.info" />
  </ion-content>
</template>

<script>
import InfoContent from '@/components/Info/InfoContent';
import InfoReview from '@/components/Info/InfoReview';
import AppHeader from '@/components/common/AppHeader';
import ItemFooter from '@/components/Item/ItemFooter';
import ItemInfo from '@/components/Item/ItemInfo';
import { getDetailPost } from '@/api/post';
import { dateFormat, review_Format } from '@/utils/dateFormat';
import { EventBus } from '../utils/bus';

export default {
  components: {
    AppHeader,
    ItemInfo,
    InfoContent,
    InfoReview,
    ItemFooter,
  },
  props: {
    bo_id: { type: Number },
    us_id: { type: Number },
  },
  data() {
    return {
      bo_data: '',
      bo_us_id: '',
      bo_show: '',
      title: '상세조회',
    };
  },
  created() {
    // 좋아요 / 싫어요 변경
    EventBus.$on('get_LikeHate', res => {
      this.bo_data.info.bo_like = res.info.data.bo_like;
      this.bo_data.info.bo_hate = res.info.data.bo_hate;
      this.bo_data.info.likehate = res.info.check;
    });
  },
  beforeDestroy() {
    EventBus.$off('get_LikeHate');
  },
  async mounted() {
    // 상세 게시글 데이터 가져오기
    const { data } = await getDetailPost(this.bo_id, this.us_id);
    // 상세 게시글, 계정 생성 날짜 binding
    const new_date = new Date();
    data.info.createdAt = dateFormat(new_date, data.info.createdAt);
    data.info.user.createdAt = review_Format(data.info.user.createdAt);
    this.bo_data = data;
    this.bo_us_id = data.info.bo_us_id;
    this.bo_show = data.info.bo_show;
  },
};
</script>

<style>
@import url('../css/ITEM.css');
</style>
