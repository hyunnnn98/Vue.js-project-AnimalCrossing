<template>
  <div class="App-Header" :class="head_css ? head_css : null">
    <ion-icon name="arrow-back" @click="go_back"> </ion-icon>
    <p>{{ head_name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    head_name: {
      type: String,
    },
    head_css: {
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
  text-align: left;
  width: 100%;
  max-width: 520px;
  height: 50px;
  min-height: 50px;
  /* line-height: 37px; */
  font-weight: bold;
  font-size: 1.3em;
  /* border-radius: 18px 8px 8px 18px; */
  letter-spacing: -2px;
  margin-bottom: 0.5em;
}

.App-Header p {
  position: relative;
  top: 0.8em;
  left: 10px;
  display: inline-block;
  /* left: 45%; */
}

.App-Header ion-icon {
  background-color: #eef3d2;
  color: #76b767;
  float: left;
  border-radius: 50px;
  margin-top: 0.8em;
  margin-left: 0.3em;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
