<template>
  <ion-content class="ion-padding passport">
    <ion-icon name="arrow-back" @click="$router.push('/login')"></ion-icon>
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
  </ion-content>
</template>

<script>
import { joinUser } from '@/api/auth';

export default {
  name: 'PassportPage',
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

<style>
.passport {
  /* margin: 10px; */
  --background: rgb(3, 194, 19);
}

.passport ion-icon {
  width: 30px;
  height: 30px;
}

.passport-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid rgb(3, 194, 19);
  padding: 10px;
  border-radius: 10px;
  background-color: white;
}

.passport-container > h2 {
  font-weight: 900;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 2em;
}

.passport-container > ul {
  flex: 1;
}

.passport-container > ul > li:nth-child(1) {
  text-align: center;
  padding: 10px;
  background-color: rgb(0, 0, 0);
  border-radius: 50px;
  color: white;
  margin: 10px 20px;
}

.passport-container > ul > li:nth-child(2) {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  /* background-color: yellowgreen; */
  border: 2px solid black;
  border-radius: 15px;
  margin-bottom: 2em;
}

.passport-container > ul > li:nth-child(3) {
  /* background-color: teal; */
  /* width: 50%; */
  padding: 10px;
}

.passport-container > ul > li:nth-child(3) > div:nth-child(n) {
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

@media (min-width: 520px) {
  .passport-container {
    width: 520px;
    margin: 0 auto;
  }
}
</style>
