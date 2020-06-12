<template>
  <div class="user-container">
    <ion-icon class="backUrl left" name="arrow-back" @click="go_back" />
    <ul>
      <li>
        <h1>회원가입</h1>
      </li>
      <li>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">이메일</ion-label>
          <ion-input
            type="text"
            :value="us_email"
            @input="us_email = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">비밀번호</ion-label>
          <ion-input
            type="password"
            :value="us_password"
            @input="us_password = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">이름</ion-label>
          <ion-input
            type="text"
            :value="us_nickname"
            @input="us_nickname = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">섬 이름</ion-label>
          <ion-input
            type="text"
            :value="us_islandname"
            @input="us_islandname = $event.target.value"
          ></ion-input>
          <transition name="fade">
            <span
              :key="0"
              @click="us_islandtype = 0"
              v-if="us_islandtype"
              class="post_cost_selector"
            >
              섬
            </span>
            <span
              :key="1"
              @click="us_islandtype = 1"
              v-else
              class="post_cost_selector"
            >
              도
            </span>
          </transition>
        </ion-item>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">통신코드</ion-label>
          <ion-input
            type="number"
            :value="us_code"
            @input="us_code = $event.target.value"
          ></ion-input>
        </ion-item>
      </li>
      <li>
        <div @click="submit" class="ani-btn success">
          등록하기
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { joinUser } from '@/api/auth';
import { toastController, toastErrorController } from '@/utils/toastController';

export default {
  data() {
    return {
      us_email: null,
      us_password: null,
      us_nickname: null,
      us_islandname: null,
      us_islandtype: 0,
      us_code: null,
    };
  },
  methods: {
    submit() {
      if (this.us_code.length != 12)
        return toastController(
          this.$ionic,
          '[통신코드] 12자리 형식을 맞춰주세요.',
          'warning',
        );
      const data = {
        us_email: this.us_email,
        us_password: this.us_password,
        us_nickname: this.us_nickname,
        us_islandname: this.us_islandname,
        us_code: this.us_code,
      };
      joinUser(data)
        .then(res => {
          toastController(
            this.$ionic,
            '입력하신 이메일로 인증 메일을 전송합니다. \n인증이 끝난 후 부터 로그인이 가능합니다.',
            'success',
          );
          this.$router.replace('/login');
        })
        .catch(err => {
          toastErrorController(this.$ionic, err);
        });
    },
    go_back() {
      try {
        this.$router.go(-1);
      } catch (error) {
        this.$ionic.modalController.dismiss();
      }
    },
  },
};
</script>

<style>
h1 {
  margin-top: 1em;
  margin-bottom: 1em;
  font-family: '뽀로로';
  font-size: 30px;
  text-align: center;
  color: #7e693a;
}

.join-ion-item-custom {
  margin-top: 30px;
}

.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 1, 1.8, 3);
}
.fade-enter,
.fade-leave-to {
  transform: translateX(3vw);
  opacity: 0;
}

.post_cost_selector {
  background-color: rgb(86, 187, 71);
  color: white !important;
  border-radius: 20px;
  font-weight: 700;
  width: 45px;
  padding: 5px 0px;
  text-align: center;
  position: absolute;
  top: 24px;
  right: 20px;
  z-index: 100000;
}
</style>
