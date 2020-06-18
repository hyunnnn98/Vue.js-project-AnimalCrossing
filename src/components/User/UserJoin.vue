<template>
  <div class="user-container join">
    <ion-icon class="backUrl left" name="arrow-back" @click="go_back" />
    <ul>
      <li>
        <h1>회원가입</h1>
      </li>
      <li class="user-join">
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">이메일</ion-label>
          <ion-input
            type="text"
            placeholder="이메일을 입력해주세요."
            :value="us_email"
            @input="us_email = $event.target.value"
          ></ion-input>
        </ion-item>
        <p
          class="email_check ani-btn success"
          v-if="isUserEmailValid == true"
          @click="email_check"
        >
          중복검사
        </p>
        <p class="validation-text">
          <span class="warning" v-if="!isUserEmailValid && us_email">
            유효한 이메일 형식이 아닙니다.
          </span>
          <span class="success" v-if="isUserEmailValid == true">
            유효한 이메일 형식입니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">비밀번호</ion-label>
          <ion-input
            type="password"
            :value="us_password"
            placeholder="암호를 8자리이상 16자리 이하로 설정해주세요."
            maxlength="16"
            @input="us_password = $event.target.value"
          ></ion-input>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserPasswordValid && us_password">
            영문, 숫자, 특수문자의 조합으로 입력해주세요.
          </span>
          <span class="success" v-if="isUserPasswordValid == true">
            올바른 비밀번호 양식입니다.
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
          <span class="success" v-if="isUserNameValid == true">
            올바른 이름입니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">섬 이름</ion-label>
          <ion-input
            type="text"
            maxlength="10"
            placeholder="초록색 버튼을 눌러 (섬 / 도) 변경이 가능합니다."
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
          <span class="success" v-if="isUserIslandValid == true">
            올바른 섬 이름입니다.
          </span>
        </p>
        <ion-item class="join-ion-item-custom">
          <ion-label position="stacked">친구코드</ion-label>
          <ion-input
            type="text"
            placeholder="친구코드 12자리를 입력해주세요."
            maxlength="12"
            :value="us_code"
            @input="us_code = $event.target.value"
          ></ion-input>
        </ion-item>
        <p class="validation-text">
          <span class="warning" v-if="!isUserCodeValid && us_code">
            - 를 제외한 코드 12자리를 입력해주세요.
          </span>
          <span class="success" v-if="isUserCodeValid == true">
            올바른 친구코드 입니다.
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
import { joinUser, emailCheck } from '@/api/auth';
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
      us_nickname: '',
      us_islandname: '',
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
  mounted() {
    toastController(
      this.$ionic,
      '현재 이메일 인증 간에 오류가 있어 \n 인증메일 확인이 안 될 경우\n 구글 이메일 주소에 한해\n 스팸 처리된 메일로 도착할 가능성이 높습니다.\n 구글 이메일 외의 다른 메일 주소로 가입해주세요. \n 빠른 시일 내에 수정하도록 하겠습니다. \n - 거래해요 동물의숲 개발자 -',
      'tertiary',
      8000,
    );
  },
  methods: {
    submit() {
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
    async email_check() {
      try {
        const { data } = await emailCheck(this.us_email);
        toastController(this.$ionic, data.message, 'success');
      } catch (err) {
        toastErrorController(this.$ionic, err);
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
