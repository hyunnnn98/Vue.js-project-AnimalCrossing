<template>
  <div class="app-header" :class="head_css ? head_css : null">
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
.app-header {
  background-color: #76b767;
  color: #eef3d2;
  text-align: left;
  width: 100%;
  max-width: 520px;
  height: 50px;
  min-height: 50px;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -2px;
  margin-bottom: 0.5em;
}

.app-header p {
  position: relative;
  top: 0.9em;
  left: 10px;
  display: inline-block;
}

.app-header ion-icon {
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
