<template>
  <div>
    <SearchBar></SearchBar>
    <div class="home-body">
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
    <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button size="small" color="success">
        <ion-icon @click="logScrollStart" name="arrow-up"></ion-icon>
      </ion-fab-button>
    </ion-fab> -->
  </div>
</template>

<script>
import SearchBar from '@/components/Home/SearchBar.vue';
import NoticeTabs from '@/components/Home/NoticeTabs.vue';
import CategoryTabs from '@/components/Home/CategoryTabs.vue';
import ItemBox from '@/components/Home/ItemBox.vue';
import { getPost, getCategory } from '@/api/post.js';
import { EventBus } from '@/utils/bus';

export default {
  name: 'HomePage',
  components: {
    SearchBar,
    NoticeTabs,
    CategoryTabs,
    ItemBox,
  },
  data() {
    return {
      items: [],
      offset: null,
      category: [],
    };
  },
  mounted() {
    getPost()
      .then(res => {
        console.log(res.data);
        this.items = res.data.info.board;
        this.offset = res.data.info.next_offset;
      })
      .catch(err => {
        console.log(err);
      });

    getCategory()
      .then(res => {
        console.log(res.data);
        this.category = res.data.info;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    set_date() {
      let now_date = new Date();
      let past_date = new Date('2020-05-25T13:02:08.000Z');
      let result = Math.abs(now_date - past_date);
      //TODO 시간 값 계산해서 나타내기
    },
    scrollToTop() {
      console.log('클릭!');

      const tag = document.querySelector('.searchInput');
      console.log(tag);

      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: tag.offsetTop,
      });
    },
    async new_post(offset) {
      let data = { offset };
      await getPost(data)
        .then(res => {
          console.log(res);
          //TODO 새로운 게시글 this.items에 추가하기.
          for (let item of res.data.info.board) {
            this.items.push(item);
          }
          console.log(this.items);
          this.offset = res.data.info.next_offset;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.item-container {
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  background-color: rgb(233, 232, 232);
  width: 100%;
  /* height: 900px; */
  /* overflow-y: scroll; */
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
