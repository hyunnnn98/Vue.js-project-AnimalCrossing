<template>
  <div class="myTrade info-bcg">
    <!-- <div>내 거래 이력 보기</div> -->
    <div class="trade-menu">
      <div @click="get_past_trade(1)" class="trade-sell">
        판매
      </div>
      <div @click="get_past_trade(2)" class="trade-buy">
        구매
      </div>
      <div @click="get_past_trade(3)" class="trade-trd">교환</div>
    </div>
    <p :class="`_${bo_trade_value}`" class="trade-progress"></p>
    <ul v-if="td_contents != ''" class="trade-content">
      <li v-for="(content, i) of td_contents" :key="i">
        <div>{{ content.bo_title }}</div>
      </li>
    </ul>
    <p class="trade-no-content" v-else>거래 내역이 없습니다.</p>
  </div>
</template>

<script>
import { toastErrorController } from '@/utils/toastController';
import { getTradeData } from '@/api/post';

export default {
  data() {
    return {
      td_contents: '',
      bo_trade_value: 1,
    };
  },
  async mounted() {
    await this.get_past_trade(1);
  },
  methods: {
    async get_past_trade(trade_value) {
      this.bo_trade_value = trade_value;
      try {
        const { data } = await getTradeData(
          this.$store.state.us_id,
          trade_value,
        );
        this.td_contents = data.info;
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
};
</script>

<style>
.trade-menu {
  display: flex;
  justify-content: space-around;
  /* flex-wrap: wrap; */
  text-align: center;
}

.trade-menu > div {
  /* flex-basis: 33%; */
  width: 100%;
  flex-shrink: 1;
  padding: 15px;
  /* border-bottom: 1px solid rgb(116, 116, 116); */
}

.trade-progress {
  position: relative;
  width: 33%;
  border-bottom: 2px solid rgb(2, 129, 61);
  transition: all 0.5s ease;
}

.trade-progress._1 {
  left: 0px;
}

.trade-progress._2 {
  left: 33%;
}

.trade-progress._3 {
  left: 66%;
}

.trade-content {
  text-indent: 0.5em;
  margin-top: 0.2em;
  font-weight: 700;
  height: 100px;
  max-height: 150px;
  overflow-y: scroll;
}

.trade-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.trade-no-content {
  text-align: center;
  margin: 1em auto;
  background-color: rgb(87, 87, 87);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.trade-content > li {
  /* background-color: blue; */
  padding: 10px;
  border-bottom: 1px solid rgb(189, 189, 189);
}

.trade-content > li:hover {
  background-color: rgba(255, 255, 255, 0.561);
}
</style>
