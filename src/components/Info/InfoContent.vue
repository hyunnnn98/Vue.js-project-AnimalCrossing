<template>
  <div class="myinfo">
    <div class="myinfo-Img">
      <img :src="`${us_info.us_thumbnail}`" alt="썸네일" />
    </div>
    <div class="myinfo-Data">
      <ul>
        <li>
          <span class="myinfo-islandTitle">{{ us_info.us_islandname }}</span>
          <span class="myinfo-island"> 섬의</span>
        </li>
        <li>
          <span class="myinfo-nickName">{{ us_info.us_nickname }}</span>
        </li>
        <li v-if="access_auth">
          <span class="myinfo-codeName">* 통신코드</span>
          <span class="myinfo-code">1234 - 1234 - 1234</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../../store/index';

export default {
  props: {
    us_info: {
      type: Object,
    },
  },
  data() {
    return {
      us_nickname: store.state.us_nickname,
      us_islandname: store.state.us_islandname,
      us_code: store.state.us_code,
      us_thumbnail: store.state.us_thumbnail,
      access_auth: true,
    };
  },
};
</script>

<style>
.myinfo {
  background-color: rgba(197, 197, 197, 0.061);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0px;
  width: 100%;
}

.myinfo-Img {
  margin-left: 5px;
  margin-right: 10px;
  border-radius: 20px;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(11, 12, 11, 0.534);
  overflow: hidden;
}

.myinfo-Data > ul {
  padding: 0px;
}

.myinfo-Data > ul > li {
  height: 35px;
  line-height: 35px;
  font-weight: 700;
  font-size: 1.1em;
  letter-spacing: -1px;
}

.myinfo-code {
  display: inline-block;
  position: relative;
  top: -29px;
  /* left: -55px; */
}

.myinfo-codeName {
  display: block;
  position: relative;
  top: -10px;
  font-size: 0.7em;
  font-weight: 300;
  margin-right: 1em;
}

.myinfo-islandTitle {
  color: blue;
  font-size: 1.1em;
  font-weight: 900;
}

.myinfo-island {
  color: rgb(90, 90, 90);
}

.myinfo-nickName {
  font-size: 1.2em;
}

@media (min-width: 350px) {
  .myinfo-Data {
    margin-right: 20px;
  }
}
</style>
