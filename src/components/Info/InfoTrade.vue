<template>
  <div class="myTrade info-bcg">
    <div class="trade-menu">
      <div @click="get_past_trade(1)">
        내 게시글
      </div>
      <div @click="get_past_trade(2)">
        구매
      </div>
      <div @click="get_past_trade(3)">교환</div>
    </div>
    <p :class="`_${bo_trade_value}`" class="trade-progress"></p>
    <ul v-if="td_contents != ''" class="trade-content">
      <li
        @click="openItemModal(content.bo_id)"
        v-for="(content, i) of td_contents"
        :key="i"
      >
        <span>{{ content.bo_title }}</span>
        <span
          class="trade-content-status"
          :class="content.bo_trade_status == '거래중' ? '_org' : '_gre'"
          >{{ content.bo_trade_status }}
        </span>
      </li>
    </ul>
    <p class="trade-no-content" v-else>거래 내역이 없습니다.</p>
  </div>
</template>

<script>
import { toastErrorController } from '@/utils/toastController';
import { EventBus } from '@/utils/bus';
import { getTradeData, setPostView } from '@/api/post';
import ItemPage from '@/views/ItemPage';

export default {
  data() {
    return {
      td_contents: '',
      bo_trade_value: 1,
    };
  },
  created() {
    // 내 게시글 전체보기 선택 이벤트
    EventBus.$on('set_past_trade', res => {
      this.get_past_trade(1);
    });
  },
  destroyed() {
    EventBus.$off('set_past_trade');
  },
  async mounted() {
    await this.get_past_trade(1);
  },
  methods: {
    // 선택된 게시글 모달 open 이벤트
    async openItemModal(bo_id) {
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
    async get_past_trade(trade_value) {
      this.bo_trade_value = trade_value;
      try {
        const { data } = await getTradeData(
          this.$store.state.us_id,
          trade_value,
        );
        let str_val = '';
        /*
            bo_trade_status 0 => 거래중
            bo_trade_status 1 => 거래완료
        */
        data.info.forEach(v => {
          switch (v.bo_trade_status) {
            case 0:
              str_val = '거래중';
              break;
            case 1:
              str_val = '거래완료';
              break;
          }
          v.bo_trade_status = str_val;
        });
        this.td_contents = data.info;
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
};
</script>

<style></style>
