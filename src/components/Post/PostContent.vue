<template>
  <div class="post-Content">
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
            :value="bo_content"
            @input="bo_content = $event.target.value"
            clear-on-edit="true"
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
import { createPost } from '@/api/post';

export default {
  data() {
    return {
      bo_trade: '',
      bo_title: '',
      bo_category: 1,
      bo_content: '',
      bo_cost: '',
      bo_cost_selector: 0,
    };
  },
  methods: {
    async submit_post() {
      let post_data = await {
        bo_trade: this.bo_trade,
        bo_title: this.bo_title,
        bo_category: this.bo_category,
        bo_content: this.bo_content,
        bo_cost: this.bo_cost,
        bo_cost_selector: this.bo_cost_selector,
        bo_us_id: this.$store.state.us_id,
      };
      createPost(post_data);
    },
    trade(number) {
      console.log('클릭이벤트 발생!', number);
      this.bo_trade = number;
    },
  },
};
</script>

<style>
.post-Content {
  padding: 10px;
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

.content input[type='text'] {
  text-indent: 5px !important;
  /* background-color: red; */
}

.native-input.sc-ion-input-md {
  padding-bottom: 0px;
}

.content span {
  color: rgb(255, 102, 0);
}

/* 판매 / 구매 / 교환 버튼 */
.set-buttons {
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
  background-color: rgba(255, 138, 4, 0.092);
  color: rgb(255, 138, 4);
}

.set-buttons > li:nth-child(2) {
  border: 1px solid rgb(255, 86, 86);
  background-color: rgba(255, 86, 86, 0.092);
  color: rgb(255, 86, 86);
}

.set-buttons > li:nth-child(3) {
  border: 1px solid rgb(96, 255, 33);
  background-color: rgba(96, 255, 33, 0.092);
  color: rgb(96, 255, 33);
}

.set-buttons > li:hover {
  color: white;
  border: 0.5px solid black;
}

.set-buttons > li:nth-child(1):hover {
  background-color: rgba(255, 138, 4, 0.767);
}

.set-buttons > li:nth-child(2):hover {
  background-color: rgba(255, 86, 86, 0.767);
}

.set-buttons > li:nth-child(3):hover {
  background-color: rgba(96, 255, 33, 0.767);
}
</style>
