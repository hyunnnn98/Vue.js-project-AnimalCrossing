<template>
  <div class="passport-container">
    <ul>
      <li>
        나만의 썸네일 사진을 변경해보세요!
      </li>
      <li>
        <div class="passport-img"></div>
      </li>
      <li>
        <div>
          <p>이메일</p>
          <input
            type="text"
            :value="us_email"
            @input="us_email = $event.target.value"
          />
        </div>
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            :value="us_password"
            @input="us_password = $event.target.value"
          />
        </div>
        <div>
          <p>이름</p>
          <input
            type="text"
            :value="us_nickname"
            @input="us_nickname = $event.target.value"
          />
        </div>
        <div>
          <p>섬 이름</p>
          <input
            type="text"
            :value="us_islandname"
            @input="us_islandname = $event.target.value"
          />
        </div>
        <div>
          <p>통신코드</p>
          <input
            type="number"
            :value="us_code"
            @input="us_code = $event.target.value"
          />
        </div>
      </li>
    </ul>
    <ion-button shape="block" color="danger" @click="submit">
      등록하기
    </ion-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      us_email: null,
      us_password: null,
      us_nickname: null,
      us_islandname: null,
      us_code: null,
    };
  },
  methods: {
    submit() {
      const data = {
        us_email: this.us_email,
        us_password: this.us_password,
        us_nickname: this.us_nickname,
        us_islandname: this.us_islandname,
        us_code: this.us_code,
      };
      joinUser(data)
        .then(res => {
          console.log(res);
          this.$router.replace('/login');
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
