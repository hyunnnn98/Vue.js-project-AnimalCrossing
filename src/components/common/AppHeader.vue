<template>
  <div class="App-Header">
    <ion-icon name="arrow-back" @click="go_back"> </ion-icon>
    {{ head_name }}
  </div>
</template>

<script>
export default {
  props: {
    head_name: {
      type: String,
    },
  },
  methods: {
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

<style>
.App-Header {
  background-color: #76b767;
  color: #eef3d2;
  text-align: center;
  width: 100%;
  max-width: 520px;
  height: 30px;
  line-height: 32px;
  font-weight: bold;
  font-size: 1.3em;
  border-radius: 18px 8px 8px 18px;
  letter-spacing: -2px;
  margin-bottom: 0.5em;
}

.App-Header ion-icon {
  background-color: #eef3d2;
  color: #76b767;
  float: left;
  border-radius: 50px;
  margin-top: 0.15em;
  margin-left: 0.3em;
  width: 25px;
  height: 25px;
}
</style>
