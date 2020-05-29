<template>
  <div class="App-Header">
    {{ head_name }}
    <ion-icon name="arrow-back" @click="$router.push('/main')"></ion-icon>
  </div>
</template>

<script>
export default {
  props: {
    head_name: {
      type: String,
    },
  },
};
</script>

<style>
.App-Header {
  text-align: center;
  height: 30px;
  line-height: 20px;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -2px;
}

.App-Header ion-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
}
</style>
