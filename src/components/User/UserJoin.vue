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
        <p class="validation-text">
          <span class="warning" v-if="!isUserEmailValid && us_email">
            유효한 이메일 형식이 아닙니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">비밀번호</ion-label>
          <ion-input
            type="password"
            :value="us_password"
            maxlength="16"
            @input="us_password = $event.target.value"
          ></ion-input>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserPasswordValid && us_password">
            비밀번호 길이는 최소 6자리 ~ 최대 16자리까지 가능합니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">이름</ion-label>
          <ion-input
            type="text"
            maxlength="10"
            :value="us_nickname"
            @input="us_nickname = $event.target.value"
          ></ion-input>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserNameValid && us_nickname">
            특수문자를 제외한 1 ~ 10자리의 이름만 가능합니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">섬 이름</ion-label>
          <ion-input
            type="text"
            maxlength="10"
            :value="us_islandname"
            @input="us_islandname = $event.target.value"
          ></ion-input>
          <transition name="fade">
            <span
              :key="0"
              @click="us_island_selector = 0"
              v-if="us_island_selector"
              class="post_cost_selector"
            >
              도
            </span>
            <span
              :key="1"
              @click="us_island_selector = 1"
              v-else
              class="post_cost_selector"
            >
              섬
            </span>
          </transition>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserIslandValid && us_islandname">
            특수문자를 제외한 1 ~ 10자리의 이름만 가능합니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">통신코드</ion-label>
          <ion-input
            type="text"
            maxlength="12"
            :value="us_code"
            @input="us_code = $event.target.value"
          ></ion-input>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserCodeValid && us_code">
            - 문자를 제외한 코드를 입력해주세요.
          </span>
        </p>
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
import {
  validateEmail,
  validatePassword,
  validateName,
  validateCode,
} from '@/utils/validation';

export default {
  data() {
    return {
      us_email: null,
      us_password: null,
      us_nickname: null,
      us_islandname: null,
      us_island_selector: 0,
      us_code: null,
    };
  },
  computed: {
    isUserEmailValid() {
      return validateEmail(this.us_email);
    },
    isUserPasswordValid() {
      return validatePassword(this.us_password);
    },
    isUserNameValid() {
      return validateName(this.us_nickname);
    },
    isUserIslandValid() {
      return validateName(this.us_islandname);
    },
    isUserCodeValid() {
      return validateCode(this.us_code);
    },
  },
  methods: {
    submit() {
      if (this.us_code == null || this.us_code.length != 12)
        return toastController(
          this.$ionic,
          `통신코드 12자리를 입력해주세요.`,
          'danger',
        );
      if (
        this.isUserEmailValid &&
        this.isUserPasswordValid &&
        this.isUserNameValid &&
        this.isUserIslandValid &&
        this.isUserCodeValid
      ) {
        const data = {
          us_email: this.us_email,
          us_password: this.us_password,
          us_nickname: this.us_nickname,
          us_islandname: this.us_islandname,
          us_island_selector: this.us_island_selector,
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
      } else {
        return toastController(
          this.$ionic,
          '입력 양식을 확인해주세요.',
          'danger',
        );
      }
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

<style></style>
