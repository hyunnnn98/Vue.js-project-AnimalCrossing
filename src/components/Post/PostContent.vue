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
            maxlength="20"
            :value="bo_title"
            @input="bo_title = $event.target.value"
          ></ion-input>
        </ion-item>
      </li>
      <li>
        <ion-item class="content">
          <ion-label><span>*</span> 카테고리</ion-label>
          <ion-select
            :value="bo_category"
            @ionChange="bo_category = $event.target.value"
            cancel-text="** 취소 **"
            interface="action-sheet"
          >
            <!-- <ion-select-option value="1">입양 / 분양</ion-select-option>
            <ion-select-option value="2">무 주식</ion-select-option>
            <ion-select-option value="3">아이템</ion-select-option>
            <ion-select-option value="4">만지작</ion-select-option>
            <ion-select-option value="5">알바</ion-select-option>
            <ion-select-option value="6">무료나눔</ion-select-option> -->
            <ion-select-option
              v-for="(select, index) of select_group"
              :key="index"
              :value="`${index + 1}`"
              >{{ select }}</ion-select-option
            >
          </ion-select>
        </ion-item>
      </li>
      <li class="post_content">
        <ion-item class="content">
          <ion-label position="floating"><span>*</span> 상품설명</ion-label>
          <ion-textarea
            placeholder="상품설명을 입력해주세요"
            class="post-textarea"
            :value="bo_content"
            @input="bo_content = $event.target.value"
          ></ion-textarea>
        </ion-item>
      </li>
      <li v-if="bo_trade_value != 3">
        <ion-item class="content">
          <ion-label position="floating"><span>*</span> 가격</ion-label>
          <ion-input
            type="text"
            maxlength="5"
            placeholder="* 1 덩 = 99000 벨"
            :value="bo_cost"
            @input="bo_cost = $event.target.value"
            clear-on-edit="true"
          ></ion-input>
          <transition name="fade">
            <span
              :key="0"
              @click="bo_cost_selector = 0"
              v-if="bo_cost_selector"
              class="post_cost_selector"
            >
              마일
            </span>
            <span
              :key="1"
              @click="bo_cost_selector = 1"
              v-else
              class="post_cost_selector"
            >
              덩
            </span>
          </transition>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserCostValid && bo_cost">
            숫자만 입력 가능합니다.
          </span>
        </p>
      </li>
      <li>
        <div class="ani-btn success" @click="submit_post(bo_type)">
          {{ bo_btn }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';
import { createPost, getDetailPost, updatePost } from '@/api/post';
import { toastController, toastErrorController } from '@/utils/toastController';
import { validateCost } from '@/utils/validation';

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
      bo_id: null,
      bo_type: null,
      bo_btn: '작성 완료',
      select_group: [
        '입양 / 분양',
        '무 주식',
        '만지작',
        '아이템',
        '알바',
        '무료나눔',
      ],
    };
  },
  computed: {
    isUserCostValid() {
      return validateCost(this.bo_cost);
    },
  },
  async created() {
    // 썸네일 변경 체크
    EventBus.$on('thumbnail_change', index_number => {
      this.bo_thumbnail = index_number;
    });

    // 게시글 업데이트시 로딩
    EventBus.$on('post_update', bo_id => {
      this.post_control(bo_id);
    });

    // 게시글 초기화
    EventBus.$on('post_init', res => {
      this.init_post();
    });

    // 처음 마운트 될 경우 params 확인 후 게시글 초기화.
    this.post_control();
  },
  beforeDestroy() {
    EventBus.$off('post_update');
    EventBus.$off('post_init');
    EventBus.$off('thumbnail_change');
  },
  methods: {
    async submit_post(bo_type) {
      if (this.$store.state.us_grant === -1) {
        let msg =
          '위험한 유저로 신고 처리되어, 거래 서비스 이용이 불가합니다. \n1:1 게시판을 이용해 신고내역을 확인해주세요.';
        toastController(this.$ionic, msg, 'warning');
        return;
      } else if (!this.isUserCostValid && this.bo_trade_value != 3) {
        let msg = '가격을 확인해주세요.';
        toastController(this.$ionic, msg, 'warning');
        return;
      } else if (this.bo_title.length > 20) {
        let msg = '상품명은 최대 20자리 까지 가능합니다.';
        toastController(this.$ionic, msg, 'warning');
        return;
      } else if (this.bo_content == '' || this.bo_title == '') {
        let str;
        this.bo_content == '' ? (str = '상품 설명') : (str = '상품명');
        let msg = str + '을 입력해주세요.';
        toastController(this.$ionic, msg, 'warning');
        return;
      } else if (this.bo_content == '' || this.bo_title == '') {
        let str;
        this.bo_content == '' ? (str = '상품 설명') : (str = '상품명');
        let msg = str + '을 입력해주세요.';
        toastController(this.$ionic, msg, 'warning');
        return;
      } else if (this.bo_trade_value == 3) {
        this.bo_cost = 0;
      }

      let result;

      let post_data = {
        bo_trade_value: this.bo_trade_value,
        bo_title: this.bo_title,
        bo_category: this.bo_category,
        bo_content: this.bo_content,
        bo_cost: this.bo_cost,
        bo_cost_selector: this.bo_cost_selector,
        bo_thumbnail: this.bo_thumbnail,
        bo_us_id: this.$store.state.us_id,
      };

      try {
        if (bo_type === 'update') {
          post_data.bo_id = this.bo_id;
          result = await updatePost(post_data);
        } else {
          result = await createPost(post_data);
        }
        // 1. 게시글 데이터 먼저 서버 전송.
        // 2. 사진 데이터 이벤트버스로 전송.
        EventBus.$emit('send_imgs', result.data.info);
        toastController(this.$ionic, '게시글 업로드 중입니다...', 'success');
        setTimeout(() => {
          toastController(
            this.$ionic,
            '등록완료 \n거래소에서 내가 쓴 글을 확인해보세요.',
            'success',
          );
          this.$router.push('/main');
          EventBus.$emit('redirect_category');
          EventBus.$emit('refresh-post');
          this.init_post();
        }, 3000);
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    init_post() {
      this.bo_trade_value = 1;
      this.bo_title = '';
      this.bo_category = 1;
      this.bo_content = '';
      this.bo_cost = '';
      this.bo_cost_selector = 0;
      this.bo_thumbnail = 6;
      this.bo_type = null;
      this.bo_id = null;
      this.bo_btn = '작성 완료';
    },
    // 게시글 업데이트 => 데이터 로딩
    async post_control(bo_id) {
      let _id = await this.$route.params.id;
      if (_id == null && bo_id != null) _id = bo_id;

      if (_id != null) {
        getDetailPost(_id, this.$store.state.us_id)
          .then(res => {
            EventBus.$emit('update_imgs', res.data.info.image);
            const data = res.data.info;
            this.bo_id = data.bo_id;
            this.bo_trade_value = data.bo_trade_value;
            this.bo_title = data.bo_title;
            this.bo_category = data.bo_category;
            this.bo_content = data.bo_content;
            this.bo_cost = data.bo_cost;
            this.bo_cost_selector = data.bo_cost_selector;
            this.bo_thumbnail = data.bo_thumbnail;
            this.bo_type = 'update';
            this.bo_btn = '수정 완료';
            this.trade(data.bo_trade_value);
          })
          .catch(err => {
            this.$router.push('/post');
            this.init_post();
          });
      } else {
        this.init_post();
      }
    },
    // 카테고리 변경 이벤트
    trade(number) {
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

<style></style>
