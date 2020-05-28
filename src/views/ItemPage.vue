<template>
  <ion-content class="ion-padding post">
    <PostHeader :head_name="this.title"></PostHeader>
    <ItemInfo v-if="bo_data" :item_data="this.bo_data.info"></ItemInfo>
    판매자정보
    <InfoContent v-if="bo_data" :us_info="this.bo_data.info.user"></InfoContent>
    <div class="pi-bottom">
      <div class="pi-input-like">좋아요버튼</div>
      <div class="pi-input-bad">싫어요버튼</div>
      <div @click="create_room()" class="pi-input-talk">거래하기</div>
    </div>
  </ion-content>
</template>

<script>
import PostHeader from '@/components/Post/PostHeader';
import InfoContent from '@/components/Info/InfoContent';
import ItemInfo from '@/components/Home/ItemInfo';
import { getDetailPost } from '@/api/post';

export default {
  components: {
    PostHeader,
    ItemInfo,
    InfoContent,
  },
  data() {
    return {
      title: '상세조회',
      bo_id: this.$route.params.id,
      us_id: this.$store.state.us_id,
      bo_data: '',
    };
  },
  async mounted() {
    const { data } = await getDetailPost(this.bo_id);
    this.bo_data = await data;
    console.log(data);
  },
  methods: {
    async create_room() {
      console.log(this.us_id);
      console.log(this.bo_id);
      await this.$store.commit('setSocket');
      await this.$store.state.socket.emit(
        'create_room',
        parseInt(this.us_id),
        parseInt(this.bo_id),
      );
      this.$router.push(`/talk/${this.bo_id}-${this.us_id}`);
    },
  },
};
</script>

<style>
.post {
  --padding-bottom: 60px;
}

.post::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.pi-contents {
  margin-top: 1em;
  letter-spacing: -1px;
}

.pi-contents > div:nth-child(n) {
  margin-bottom: 0.5em;
}

.pi-imgs {
  width: 100%;
  height: 280px;
  margin: 0 auto;
}

.pi-imgs > img {
  width: 100%;
  height: 100%;
  max-width: 480px;
}

.pi-title {
  letter-spacing: -2px;
  font-weight: 700;
  font-size: 1.5em;
}

.pi-price {
  letter-spacing: -2px;
  font-size: 2em;
  font-weight: 900;
}

.pi-price > span {
  letter-spacing: -1px;
  background: black;
  color: white;
  border-radius: 10px;
  padding: 3px 7px;
  font-size: 0.7em;
  position: relative;
  top: -3px;
}

.pi-info > span:nth-child(n) {
  margin-right: 0.4em;
}

.pi-content {
  border-radius: 5px;
  margin-top: 2em;
  background-color: rgb(245, 245, 245);
  padding: 10px 20px;
  line-height: 25px;
}

.pi-bottom {
  display: inline-flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 50px;
  /* padding: 10px; */
  width: 100%;
  margin: 0px;
  /* background-color: red; */
}

.pi-input-like {
  background-image: url('../imgs/like.png');
  flex-grow: 1;
}

.pi-input-bad {
  background-image: url('../imgs/bad.png');
  flex-grow: 1;
}

.pi-input-talk {
  flex-grow: 4;
  background-color: rgb(102, 202, 102);
  color: white;
  font-size: 1.7em;
  letter-spacing: -2px;
  text-align: center;
  line-height: 50px;
}

@media (min-width: 520px) {
  .postInfoPage {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
