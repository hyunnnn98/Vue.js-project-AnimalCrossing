<template>
  <div class="passport">
    <div class="passport-container">
      <h2>- PASSPORT -</h2>
      <ul>
        <li><div class="passport-img"></div></li>
        <li>
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
    </div>
    <ion-button shape="block" color="success" @click="submit"
      >등록하기</ion-button
    >
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      us_nickname: null,
      us_islandname: null,
      us_code: null,
      us_info: null,
    };
  },
  methods: {
    submit() {
      this.us_info = this.$store.state.us_info;
      const data = {
        us_nickname: this.us_nickname,
        us_islandname: this.us_islandname,
        us_code: this.us_code,
        us_social_id: this.us_info.us_social_id,
        us_social: this.us_info.us_social,
        us_logintoken: this.us_info.us_logintoken,
      };
      axios
        .post('https://anicro.org/auth/create_user_info', data)
        .then(res => {
          console.log(res);
          this.$router.replace('/main');
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.passport {
  margin: 10px;
}

.passport-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid rgb(3, 194, 19);
  padding: 10px;
  /* background-color: red; */
}

.passport-container > h2 {
  text-align: center;
  margin-bottom: 2em;
}

.passport-container > ul {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  /* background-color: red; */
  height: 500px;
}

.passport-container > ul > li:nth-child(1) {
  width: 150px;
  height: 150px;
  /* background-color: yellowgreen; */
  border: 2px solid black;
  border-radius: 15px;
}

.passport-container > ul > li:nth-child(2) {
  /* background-color: teal; */
  width: 50%;
}

.passport-container > ul > li:nth-child(2) > div:nth-child(n) {
  margin-bottom: 2em;
  /* background-color: red; */
}

.passport-container input {
  border: 0px;
  border-radius: 0px;
  border-bottom: 1.5px solid rgb(172, 172, 172);
  height: 50px;
  font-size: 1.6em;
  padding: 0px;
  text-indent: 0px;
  letter-spacing: -1px;
}

.passport-container input[type='number'] {
  font-size: 1.4em;
}

.passport-img {
  height: 128px;
  margin: 10px 10px 10px 10px;
  border-radius: 15px;
  border: 2px solid black;
  background-image: url('../imgs/tanuki.png');
  background-size: cover;
  /* background-color: teal; */
}
</style>
