<template>
  <div class="LoginBody">
    <ul>
      <li>
        <div>
          <p>이메일</p>
          <input
            type="text"
            :value="us_email"
            @input="us_email = $event.target.value"
          />
        </div>
      </li>
      <li>
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            :value="us_password"
            @input="us_password = $event.target.value"
          />
        </div>
      </li>
      <li v-if="message" class="warning">{{ message }}</li>
      <li>
        <ion-button shape="block" color="success" @click="submitForm">
          로그인
        </ion-button>
      </li>
      <li>
        <div @click="$router.push('/passport')">회원가입</div>
        <div @click="$router.push('/passport')">비밀번호 찾기</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      us_email: null,
      us_password: null,
      message: null,
    };
  },
  methods: {
    async submitForm() {
      let user_info;
      try {
        const data = {
          us_email: this.us_email,
          us_password: this.us_password,
        };
        user_info = await this.$store.dispatch('LOGIN', data);
        if (user_info) this.$router.push('/main');
      } catch (err) {
        console.log('[임시] 로그인 실패!', err.message);
        this.message = err.message;
      }
    },
  },
};
</script>

<style></style>
