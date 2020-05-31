<template>
  <div class="home-main">
    <SearchBar></SearchBar>
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
      <CategoryTabs :category="category"></CategoryTabs>
      <ul class="item-container">
        <ItemBox
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        ></ItemBox>
        <li @click="new_post(offset)" class="itme-ad">
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
import CategoryTabs from '@/components/Home/CategoryTabs.vue';
import ItemBox from '@/components/Item/ItemBox.vue';
import ScrollControl from '@/components/Home/ScrollControl.vue';
import { getPost, getCategory } from '@/api/post.js';
import { EventBus } from '@/utils/bus';
import { dateFormat } from '@/utils/dateFormat';

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
      offset: null,
      category: [],
    };
  },
  created() {
    EventBus.$on('main-reset', res => {
      console.log('게시글 리로딩!');
      this.refreshPost();
    });
  },
  mounted() {
    this.refreshPost();
    getCategory()
      .then(res => {
        this.category = res.data.info;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    refreshPost() {
      getPost()
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
      // 여기서 for문 시작.
      posts_date.forEach(v => {
        v.createdAt = dateFormat(now_date, v.createdAt);
        // past_date = new Date(element.createdAt);
        // result_hour =
        //   (now_date.getTime() - past_date.getTime()) / (1000 * 60 * 60 * 24);

        // if (result_hour > 1) {
        //   result_date =
        //     past_date.getMonth() + 1 + '월 ' + past_date.getDate() + '일';
        // } else {
        //   let hour = now_date.getHours() - past_date.getHours();
        //   let minutes =
        //     now_date.getHours() * 60 +
        //     now_date.getMinutes() -
        //     (past_date.getHours() * 60 + past_date.getMinutes());
        //   hour > 0
        //     ? (result_date = hour + '시간전')
        //     : (result_date = minutes + '분전');
        // }
        // console.log(result_date);
        // v.createdAt = result_date;
      });

      //TODO 시간 값 계산해서 나타내기
    },
    async new_post(offset) {
      try {
        const res = await getPost({ offset });
        if (res) {
          // console.log(res);
          await this.set_date(res.data.info.board);
          //TODO 새로운 게시글 this.items에 추가하기.
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
