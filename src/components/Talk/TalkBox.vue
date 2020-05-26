<template>
  <li @click="get_talk" class="talk-box">
    <div class="talk-avater">{{ room_id }}</div>
    <div class="talk-content">아바타 그림</div>
    <div class="talk-info">아바타 그림</div>
  </li>
</template>

<script>
export default {
  props: {
    room_id: {
      type: Number,
    },
  },
  methods: {
    get_talk() {
      console.log(this.room_id);
      this.$router.push('/talk/1');
    },
  },
};
</script>

<style>
.talk-box {
  flex: 1;
  background-color: red;
  margin: 5px 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}

.talk-avater {
  background-color: yellowgreen;
  /* flex-grow: 0.5; */
  width: 80px;
  height: 100%;
  border-radius: 25px;
  padding: 10px;
}

.talk-content {
  flex-grow: 4;
  padding: 10px;
}

.talk-info {
  flex-grow: 0.5;
  background-color: blue;
  padding: 10px;
}
</style>
