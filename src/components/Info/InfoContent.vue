<template>
  <div class="if-content">
    <div class="myinfo">
      <div class="myinfo-Img">
        <img :src="`${us_info.us_thumbnail}`" alt="썸네일" />
      </div>
      <div class="myinfo-Data">
        <ul>
          <li>
            <span class="myinfo-title">닉네임 :</span>{{ us_info.us_nickname }}
          </li>
          <li>
            <span class="myinfo-title">섬 이름 :</span
            >{{ us_info.us_islandname }}
            <span class="myinfo-island">섬</span>
          </li>
          <li v-if="access_auth">
            <span class="myinfo-title">통신코드 :</span>1234 - 1234 - 1234
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    us_info: {
      type: Object,
    },
  },
  data() {
    return {
      us_nickname: this.$store.state.us_nickname,
      us_islandname: this.$store.state.us_islandname,
      us_code: this.$store.state.us_code,
      us_thumbnail: this.$store.state.us_thumbnail,
      access_auth: true,
    };
  },
};
</script>

<style>
.if-content {
  /* background-color: red; */
}

.myinfo {
  background-color: rgba(197, 197, 197, 0.061);
  border-radius: 10px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.myinfo-Img {
  /* flex-grow: 1; */
  /* background-color: blue; */
  border-radius: 20px;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(11, 12, 11, 0.534);
  overflow: hidden;
}

.myinfo-Data {
  flex-grow: 5;
}

.myinfo-Data > ul {
  /* background-color: red; */
  padding: 10px;
}

.myinfo-Data > ul > li {
  height: 50px;
  line-height: 50px;
  font-weight: 700;
  font-size: 1.3em;
  letter-spacing: -1px;
  /* background-color: blue; */
}

.myinfo-title {
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 0.7em;
  margin-right: 1em;
  font-weight: 300;
  /* background-color: tomato; */
}

.myinfo-island {
  background-color: rgba(0, 0, 0, 0.65);
  padding: 3px 8px;
  border-radius: 10px;
  color: white;
}
</style>
