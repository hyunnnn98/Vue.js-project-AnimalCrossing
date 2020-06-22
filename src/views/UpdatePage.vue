<template>
  <ion-content class="update">
    <img src="../imgs/update_plz.png" alt="업데이트" />
    <p>중요한 업데이트가 있습니다!</p>
    <p>업데이트 후 이용 부탁드립니다.</p>
    <div class="ani-btn success">
      <a
        href="https://play.google.com/store/apps/details?id=io.ionic.tradeAnimalCrossing"
        >업데이트 하러가기</a
      >
    </div>
  </ion-content>
</template>

<script>
import { versionCheck } from '@/api/auth';
import { toastController } from '@/utils/toastController';

export default {
  async mounted() {
    /*
        ** 중요한 업데이트일때만 사용 **
        서버로 부터 버전 체크
        true  => 메인페이지 리다이렉션.
        false => 업데이트 유도.
    */
    try {
      const { data } = await versionCheck();
      if (process.env.VUE_APP_ANICRO_VERSION == data.info) {
        this.$router.push('/');
      }
    } catch (e) {
      toastController(
        this.$ionic,
        '모바일 버전 체크에 실패하였습니다...\n 잠시 후 다시 시도해주세요.',
        'danger',
      );
    }
  },
};
</script>

<style>
.update {
  --background: rgb(46, 163, 241);
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  text-align: center;
  padding: 2em;
}

.update > img {
  width: 200px;
  margin-top: 1em;
  margin-bottom: 2em;
  text-align: center;
}

.update > p {
  margin-top: 1em;
  font-size: 0.9em;
  color: white;
  font-weight: 900;
}

.update > div {
  display: inline-block;
  padding: 15px 40px;
}

.update a {
  color: white;
  font-weight: 700;
}
</style>
