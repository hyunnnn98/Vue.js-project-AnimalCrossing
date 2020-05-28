<template>
  <li v-if="room_data" @click="join_room" class="talk-box">
    <div class="talk-avater"></div>
    <div class="talk-content">
      {{ room_data.board.bo_title }}
    </div>
    <div class="talk-info">아바타 그림</div>
  </li>
</template>

<script>
export default {
  props: {
    room_data: {
      type: Object,
    },
  },
  methods: {
    join_room() {
      this.$router.push(`/talk/${this.room_data.ch_room_id}`);
      this.$store.state.socket.emit(
        'join_room',
        this.$store.state.us_id,
        this.room_data.ch_room_id,
      );
      this.$store.state.socket.emit('get_read_count', this.$store.state.us_id);
    },
  },
};
</script>

<style>
.talk-box {
  flex: 1;
  /* background-color: red; */
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
