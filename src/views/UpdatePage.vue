<template>
  <div class="update">
    <img src="../imgs/update_plz.png" alt="업데이트" />
    <p>플레이 스토어에서 새로운 버전으로</p>
    <p>업데이트해주세요!</p>
  </div>
</template>

<script>
export default {
  mounted() {
    //TODO 서버로 부터 버젼 가져오기
    if (process.env.VUE_APP_ANICRO_VERSION != '새로나온 버젼') {
      this.$router.push('/');
    }
  },
};
</script>

<style>
.update {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  background-color: rgb(46, 163, 241);
  padding: 2em;
}

.update > img {
  width: 200px;
}

.update > p {
  margin-top: 2em;
  font-size: 1.3em;
  color: white;
  font-weight: 900;
}
</style>
