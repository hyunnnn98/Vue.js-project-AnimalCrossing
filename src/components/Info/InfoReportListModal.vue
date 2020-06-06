<template>
  <div class="modal-category">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ion-item>
        <ion-label><span>*</span> 문의유형</ion-label>
        <ion-select
          interface="popover"
          placeholder="선택"
          :value="re_category"
          @ionChange="re_category = $event.target.value"
        >
          <ion-select-option value="회원정보">회원정보</ion-select-option>
          <ion-select-option value="계정정지">계정정지</ion-select-option>
          <ion-select-option value="거래">거래</ion-select-option>
          <ion-select-option value="개발자 피드백">
            개발자 피드백
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ul class="qu-list">
        <li v-for="(list, index) of re_lists" :key="index">
          <div class="qu-title" @click="change_view(index)">
            <span :class="list.re_status == 0 ? 'qu-ye' : 'qu-co'">
              {{ list.re_status == 0 ? '처리 중' : '답변완료' }}
            </span>
            {{ list.re_title }}
          </div>
          <div
            v-if="list.re_status == 1 && click_view == index"
            class="qu-content"
          >
            {{ list.answer.an_content }}
            <!-- 문의주신 내용 확인 결과, 000님의 거래 내역이 확인되어 사기로~
            동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
            -거래해요 동물의숲 운영진- -->
            <!-- {{ list.}} -->
          </div>
        </li>
      </ul>
    </ion-content>
  </div>
</template>

<script>
import store from '../../store/index';
import ModalHeader from '@/components/common/ModalHeader';
import { getReport } from '@/api/report';
import { toastController } from '@/utils/toastController';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '1 : 1 문의내역',
      re_title: null,
      re_content: null,
      re_category: null,
      re_lists: null,
      click_view: -1,
    };
  },
  async mounted() {
    const { data } = await getReport(store.state.us_id);
    this.re_lists = data.info;
    console.log(data.info);
  },
  methods: {
    change_view(_id) {
      console.log(_id);
      this.click_view = _id;
    },
  },
};
</script>

<style>
.modal-category {
  padding: 20px 5px;
}

.modal-category ion-title {
  text-align: center;
  height: 30px;
  line-height: 20px;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -2px;
}

.backUrl {
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 1.3em;
  cursor: pointer;
  color: rgb(0, 0, 0);
}

.qu-body span {
  color: rgb(255, 102, 0);
}

.qu-list li {
  padding: 10px;
  border-bottom: 1px solid rgb(189, 189, 189);
}

.qu-title > span {
  display: inline-block;
  color: rgb(255, 255, 255);
  background-color: rgb(52, 209, 99);
  border-radius: 5px;
  padding: 5px;
  width: 70px;
  margin-right: 0.5em;
  text-align: center;
}

.qu-title > span.qu-ye {
  background-color: rgb(243, 94, 25);
}

.qu-content {
  background-color: rgb(241, 241, 241);
  margin-top: 0.5em;
  padding: 15px 5px;
}

.talk-modal-css {
  --width: 100% !important;
  --height: 100% !important;
}

@media only screen and (min-height: 600px) and (min-width: 768px) {
  .talk-modal-css {
    --width: 50% !important;
    --height: 95% !important;
  }
}
</style>
