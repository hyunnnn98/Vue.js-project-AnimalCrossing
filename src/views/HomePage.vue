<template>
  <ion-content class="home-main">
    <SearchBar :category="category"></SearchBar>
    <ion-content class="home-body" :scrollEvents="true">
      <NoticeTabs></NoticeTabs>
      <CategoryTabs></CategoryTabs>
      <ul class="item-container">
        <ItemBox
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        ></ItemBox>
        <li @click="new_post(offset, ca_id)" class="itme-ad">
          <ion-icon name="cloud-download"></ion-icon>
        </li>
        <!-- <li class="itme-ad">광고영역</li> -->
      </ul>
    </ion-content>
    <ScrollControl></ScrollControl>
  </ion-content>
</template>

<script>
import SearchBar from '@/components/Home/SearchBar.vue';
import NoticeTabs from '@/components/Home/NoticeTabs.vue';
import CategoryTabs from '@/components/Home/CategoryTabs.vue';
import ItemBox from '@/components/Item/ItemBox.vue';
import ScrollControl from '@/components/Home/ScrollControl.vue';
import { getPost, getCategory } from '@/api/post.js';
import { dateFormat } from '@/utils/dateFormat';
import { toastErrorController } from '@/utils/toastController';
import { EventBus } from '@/utils/bus';

export default {
  components: {
    SearchBar,
    NoticeTabs,
    CategoryTabs,
    ItemBox,
    ScrollControl,
  },
  data() {
    return {
      items: [],
      category: [],
      offset: -1,
      ca_id: 0,
    };
  },
  created() {
    // 게시글 새로고침
    EventBus.$on('refresh-post', res => {
      this.offset = -1;
      this.ca_id = 0;
      this.refreshPost(0);
    });
    // 대표 카테고리 아이디
    EventBus.$on('change_category', ctg_index => {
      this.offset = -1;
      this.refreshPost(this.ca_id, ctg_index);
    });
    // 세부 카테고리 아이디
    EventBus.$on('ca_id_Change', ca_id => {
      this.ca_id = ca_id;
      this.offset = -1;
      this.refreshPost(ca_id);
    });
  },
  mounted() {
    // 사용자 라이프사이클 마운트 => 게시글 리로딩
    this.refreshPost(0);
    getCategory()
      .then(res => {
        this.category = res.data.info;
      })
      .catch(err => {
        toastErrorController(this.$ionic, err);
      });
  },
  methods: {
    // (세부카테고리, 전체카테고리)별 게시글 리로딩
    refreshPost(ca_id, bo_trade_value) {
      getPost({
        offset: this.offset,
        ca_id,
        bo_trade_value,
      })
        .then(async res => {
          await this.set_date(res.data.info.board);
          this.items = res.data.info.board;
          this.offset = res.data.info.next_offset;
        })
        .catch(err => {
          toastErrorController(this.$ionic, err);
        });
    },
    set_date(posts_date) {
      // 날짜 벨리데이션
      const now_date = new Date();
      posts_date.forEach(v => {
        v.createdAt = dateFormat(now_date, v.createdAt);
      });
    },
    async new_post(offset, ca_id) {
      // offset 기준 새로운 게시글 받아오기.
      try {
        const res = await getPost({
          offset,
          ca_id,
        });
        if (res) {
          await this.set_date(res.data.info.board);
          for (let item of res.data.info.board) {
            this.items.push(item);
          }
          this.offset = res.data.info.next_offset;
        }
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
  beforeDestroy() {
    EventBus.$off('refresh-post');
    EventBus.$off('ca_id_Change');
    EventBus.$off('change_category');
  },
};
</script>

<style>
@import url('../css/HOME.css');
</style>
