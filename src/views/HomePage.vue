<template>
  <div class="home-main">
    <SearchBar :category="category"></SearchBar>
    <div class="home-body">
      //TODO ion-refresher 추가하기.
      <!-- <ion-content>
        <ion-refresher
          @ionRefresh="doRefresh($event)"
          slot="fixed"
          pull-factor="0.5"
          pull-min="100"
          pull-max="200"
        >
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
      </ion-content> -->
      <NoticeTabs></NoticeTabs>
      <!-- <CategoryTabs :category="category"></CategoryTabs> -->
      <ul class="item-container">
        <ItemBox
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        ></ItemBox>
        <li @click="new_post(offset, ca_id)" class="itme-ad">
          다음페이지로 넘어가기
        </li>
        <li class="itme-ad">광고영역</li>
      </ul>
    </div>
    <ScrollControl></ScrollControl>
  </div>
</template>

<script>
import SearchBar from '@/components/Home/SearchBar.vue';
import NoticeTabs from '@/components/Home/NoticeTabs.vue';
import ItemBox from '@/components/Item/ItemBox.vue';
import ScrollControl from '@/components/Home/ScrollControl.vue';
import { getPost, getCategory } from '@/api/post.js';
import { dateFormat } from '@/utils/dateFormat';
import { EventBus } from '@/utils/bus';

export default {
  components: {
    SearchBar,
    NoticeTabs,
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
      console.log('test1');
      this.offset = -1;
      this.refreshPost(0);
    });

    EventBus.$on('ca_id_Change', ca_id => {
      this.ca_id = ca_id;
      this.offset = -1;
      this.refreshPost(ca_id);
    });
  },
  mounted() {
    this.refreshPost(0);
    getCategory()
      .then(res => {
        this.category = res.data.info;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    refreshPost(ca_id) {
      console.log('최종 카테고리', ca_id);
      getPost({
        offset: this.offset,
        ca_id,
      })
        .then(async res => {
          await this.set_date(res.data.info.board);
          console.log(res.data);
          this.items = res.data.info.board;
          this.offset = res.data.info.next_offset;
        })
        .catch(err => {
          console.log(err);
        });
    },
    set_date(posts_date) {
      const now_date = new Date();
      posts_date.forEach(v => {
        v.createdAt = dateFormat(now_date, v.createdAt);
      });
    },
    async new_post(offset, ca_id) {
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
          console.log(this.items);
          this.offset = res.data.info.next_offset;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeDestroy() {
    EventBus.$off('refresh-post');
    EventBus.$off('ca_id_Change');
  },
};
</script>

<style>
.item-container {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(233, 232, 232);
  width: 100%;
}

.item-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.home-body {
  overflow-y: scroll;
  max-width: none;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translateX(-50%) translateY(-50%);
}

.home-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.itme-ad {
  display: block;
  width: 100%;
  color: white;
  text-align: center;
  background-color: #558bee;
  margin: 5px 3px;
  padding: 10px;
}

.item-container > li:nth-last-child(2) {
  border-radius: 8px;
}
</style>
