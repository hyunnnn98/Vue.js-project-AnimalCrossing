<template>
  <ion-content class="ion-padding post">
    <ItemHeader></ItemHeader>
    <ItemInfo v-if="bo_data" :item_data="this.bo_data.info"></ItemInfo>
    <span class="item-info">판매자정보</span>
    <InfoContent v-if="bo_data" :us_info="this.bo_data.info.user"></InfoContent>
    <span class="item-info">후기정보</span>
    <InfoComment></InfoComment>
    <ItemFooter :bo_id="bo_id"></ItemFooter>
  </ion-content>
</template>

<script>
import InfoContent from '@/components/Info/InfoContent';
import InfoComment from '@/components/Info/InfoComment';
import ItemHeader from '@/components/Item/ItemHeader';
import ItemFooter from '@/components/Item/ItemFooter';
import ItemInfo from '@/components/Item/ItemInfo';
import { getDetailPost } from '@/api/post';
import { dateFormat } from '@/utils/dateFormat';
import { EventBus } from '../utils/bus';

export default {
  components: {
    ItemHeader,
    ItemInfo,
    InfoContent,
    InfoComment,
    ItemFooter,
  },
  props: {
    bo_id: {
      type: Number,
    },
  },
  data() {
    return {
      bo_data: '',
      title: '상세조회',
    };
  },
  created() {
    EventBus.$on('get_LikeHate', res => {
      console.log('이벤트 버스로 받은 데이터 :', res);
      console.log('getData: ', this.bo_data);
      this.bo_data.info.bo_like = res.info.bo_like;
      this.bo_data.info.bo_hate = res.info.bo_hate;
    });
  },
  beforeDestroy() {
    EventBus.$off('get_LikeHate');
  },
  async mounted() {
    const { data } = await getDetailPost(this.bo_id);
    console.log(data);
    const new_date = new Date();
    let return_date = dateFormat(new_date, data.info.createdAt);
    data.info.createdAt = return_date;
    this.bo_data = data;
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
  left: 5px;
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
  z-index: 100;
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

.item-info {
  position: relative;
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 5px;
  top: 10px;
  left: 10px;
}

@media (min-width: 520px) {
  .postInfoPage {
    width: 500px;
    margin: 0 auto;
  }
}

@media only screen and (min-height: 600px) and (min-width: 768px) {
  .item-modal-css {
    --width: 80% !important;
    --height: 95% !important;
  }
}
</style>
