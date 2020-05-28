<template>
  <div class="post-Content">
    <p class="thumbnail-info">사진을 클릭해 대표 사진을 지정해주세요!</p>
    <ul class="set-buttons">
      <li @click="trade(1)">판매</li>
      <li @click="trade(2)">구매</li>
      <li @click="trade(3)">교환</li>
    </ul>
    <ul class="set-post">
      <li>
        <ion-item class="content">
          <ion-label position="floating"><span>*</span> 상품명</ion-label>
          <ion-input
            :value="bo_title"
            @input="bo_title = $event.target.value"
            clear-on-edit="true"
          ></ion-input>
        </ion-item>
      </li>
      <li>
        <ion-item class="content">
          <ion-label><span>*</span> 카테고리</ion-label>
          <!-- <ion-label>Notifications</ion-label> -->
          <ion-select
            :value="bo_category"
            @ionChange="bo_category = $event.target.value"
            cancel-text="** 취소 **"
            interface="action-sheet"
          >
            <ion-select-option value="1">입양 / 분양</ion-select-option>
            <ion-select-option value="2">무 주식</ion-select-option>
            <ion-select-option value="3">아이템</ion-select-option>
            <ion-select-option value="4">만지작</ion-select-option>
            <ion-select-option value="5">알바</ion-select-option>
            <ion-select-option value="6">무료나눔</ion-select-option>
          </ion-select>
        </ion-item>
      </li>
      <li class="post_content">
        <ion-item class="content">
          <ion-label position="floating"><span>*</span> 상품설명</ion-label>
          <ion-textarea
            class="post-textarea"
            :value="bo_content"
            @input="bo_content = $event.target.value"
          ></ion-textarea>
        </ion-item>
      </li>
      <li>
        <ion-item class="content">
          <ion-label position="floating"><span>*</span> 가격</ion-label>
          <ion-input
            type="number"
            :value="bo_cost"
            @input="bo_cost = $event.target.value"
            clear-on-edit="true"
          ></ion-input>
        </ion-item>
      </li>
      <li>
        <ion-button shape="block" color="success" @click="submit_post">
          작성 완료
        </ion-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';
import { createPost } from '@/api/post';

export default {
  name: 'post-content',
  data() {
    return {
      bo_trade_value: 1,
      bo_title: '',
      bo_category: 1,
      bo_content: '',
      bo_cost: '',
      bo_cost_selector: 0,
      bo_thumbnail: 6,
    };
  },
  created() {
    EventBus.$on('thumbnail_change', index_number => {
      console.log('바뀐 썸네일은?', index_number);
      this.bo_thumbnail = index_number;
    });
  },
  methods: {
    async submit_post() {
      try {
        let post_data = await {
          bo_trade_value: this.bo_trade_value,
          bo_title: this.bo_title,
          bo_category: this.bo_category,
          bo_content: this.bo_content,
          bo_cost: this.bo_cost,
          bo_cost_selector: this.bo_cost_selector,
          bo_thumbnail: this.bo_thumbnail,
          bo_us_id: this.$store.state.us_id,
        };
        const result = await createPost(post_data);
        alert(result.data.info);
        if (result) EventBus.$emit('send_imgs', result.data.info);
        this.init_post();
        EventBus.$emit('main-reset');
        this.$router.push('/main');
      } catch (err) {
        console.log(err);
      }
    },
    init_post() {
      this.bo_trade_value = '';
      this.bo_title = '';
      this.bo_category = '';
      this.bo_content = '';
      this.bo_cost = '';
      this.bo_cost_selector = '';
      this.bo_us_id = '';
    },
    trade(number) {
      console.log('클릭이벤트 발생!', number);
      this.bo_trade_value = number;

      let sale = document.querySelector(`.set-buttons li:nth-child(1)`);
      let purchase = document.querySelector(`.set-buttons li:nth-child(2)`);
      let exchange = document.querySelector(`.set-buttons li:nth-child(3)`);
      switch (number) {
        case 1:
          sale.style.backgroundColor = 'rgba(255, 138, 4, 0.767)';
          purchase.style.backgroundColor = 'rgba(255, 86, 86, 0.092)';
          exchange.style.backgroundColor = 'rgba(86, 230, 29, 0.092)';
          sale.style.color = 'rgb(255, 255, 255)';
          purchase.style.color = 'rgb(255, 86, 86)';
          exchange.style.color = 'rgb(86, 230, 29)';
          break;
        case 2:
          sale.style.backgroundColor = 'rgba(255, 138, 4, 0.092)';
          purchase.style.backgroundColor = 'rgba(255, 86, 86, 0.767)';
          exchange.style.backgroundColor = 'rgba(86, 230, 29, 0.092)';
          sale.style.color = 'rgb(255, 138, 4)';
          purchase.style.color = 'rgb(255, 255, 255)';
          exchange.style.color = 'rgb(86, 230, 29)';
          break;
        case 3:
          sale.style.backgroundColor = 'rgba(255, 138, 4, 0.092)';
          purchase.style.backgroundColor = 'rgba(255, 86, 86, 0.092)';
          exchange.style.backgroundColor = 'rgba(86, 230, 29, 0.767)';
          sale.style.color = 'rgb(255, 138, 4)';
          purchase.style.color = 'rgb(255, 86, 86)';
          exchange.style.color = 'rgb(255, 255, 255)';
          break;
      }
    },
  },
};
</script>

<style>
.post-Content {
  padding: 0px 10px 10px 10px;
}

.post-Content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.thumbnail-info {
  width: 270px;
  margin: 0 auto;
  text-align: center;
  padding: 3px 0px 3px;
  background-color: rgba(0, 0, 0, 0.76);
  color: white;
  border-radius: 50px;
}

.set-post {
  margin-top: 2em;
}

.content {
  border: 0px;
  border-radius: 0px;
  height: 70px;
  font-size: 1.1em;
  letter-spacing: -1px;
  --padding-start: -10px;
  --highlight-height: 0px;
}

.content:hover {
  border: 0px;
}

.content input[type='text'],
.content input[type='number'] {
  text-indent: 5px !important;
  /* background-color: red; */
}

.postPage .native-input.sc-ion-input-md {
  padding-bottom: 0px;
}

.content span {
  color: rgb(255, 102, 0);
}

.post_content ion-item {
  height: 150px;
}

.post-textarea > textarea {
  height: 120px;
  text-indent: 0px;
  /* overflow: hidden; */
  /* padding: 5px 5px; */
}

/* 판매 / 구매 / 교환 버튼 */
.set-buttons {
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
}

.set-buttons > li {
  text-align: center;
  /* width: 30%; */
  /* background-color: blue; */
  width: 30%;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  font-weight: 900;
  transition: 0.5s;
}

.set-buttons > li:nth-child(1) {
  border: 1px solid rgb(255, 138, 4);
  background-color: rgba(255, 138, 4, 0.767);
  color: white;
}

.set-buttons > li:nth-child(2) {
  border: 1px solid rgb(255, 86, 86);
  background-color: rgba(255, 86, 86, 0.092);
  color: rgb(255, 86, 86);
}

.set-buttons > li:nth-child(3) {
  border: 1px solid rgb(86, 230, 29);
  background-color: rgba(86, 230, 29, 0.092);
  color: rgb(86, 230, 29);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
