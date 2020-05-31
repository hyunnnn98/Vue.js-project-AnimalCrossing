<template>
  <ion-content class="ion-padding post">
    <AppHeader :head_name="this.title"></AppHeader>
    <ItemInfo v-if="bo_data" :item_data="this.bo_data.info"></ItemInfo>
    <span class="item-info">판매자정보</span>
    <InfoContent v-if="bo_data" :us_info="this.bo_data.info.user"></InfoContent>
    <span class="item-info">후기정보</span>
    <InfoComment></InfoComment>
    <ItemFooter></ItemFooter>
  </ion-content>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';
import InfoContent from '@/components/Info/InfoContent';
import InfoComment from '@/components/Info/InfoComment';
import ItemFooter from '@/components/Item/ItemFooter';
import ItemInfo from '@/components/Item/ItemInfo';
import { getDetailPost } from '@/api/post';
import { dateFormat } from '@/utils/dateFormat';

export default {
  components: {
    AppHeader,
    ItemInfo,
    InfoContent,
    InfoComment,
    ItemFooter,
  },
  data() {
    return {
      bo_data: '',
      title: '상세조회',
      bo_id: this.$route.params.id,
    };
  },
  async mounted() {
    const { data } = await getDetailPost(this.bo_id);
    const new_date = new Date();
    let return_date = dateFormat(new_date, data.info.createdAt);
    data.info.createdAt = return_date;
    this.bo_data = data;
    console.log(data);
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
</style>
