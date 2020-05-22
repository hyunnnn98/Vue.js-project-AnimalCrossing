<template>
  <div class="lds-facebook">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  async beforeMount() {
    this.us_info.us_logintoken = await this.$route.params.us_logintoken;
    this.us_info.us_social_id = await this.$route.params.us_social_id;
    this.us_info.us_social = await this.$route.params.us_social;
    this.saveData();
  },
  data() {
    return {
      us_info: {
        us_logintoken: '',
        us_social_id: '',
        us_social: '',
      },
    };
  },
  methods: {
    saveData() {
      this.$store.dispatch('SaveData', this.us_info);
      this.$router.replace('/passport');
    },
  },
};
</script>

<style>
.lds-facebook {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 47%;
  left: 47%;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  /* background: #42b883; */
  background: rgba(0, 255, 106, 0.959);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
}
</style>
