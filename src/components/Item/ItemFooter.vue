<template>
  <div class="pi-bottom">
    <div class="pi-input-like">좋아요버튼</div>
    <div class="pi-input-bad">싫어요버튼</div>
    <div @click="create_room()" class="pi-input-talk">거래하기</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bo_id: this.$route.params.id,
      us_id: this.$store.state.us_id,
    };
  },
  methods: {
    async create_room() {
      console.log(this.us_id);
      console.log(this.bo_id);
      await this.$store.commit('setSocket');
      await this.$store.state.socket.emit(
        'create_room',
        parseInt(this.us_id),
        parseInt(this.bo_id),
      );
      this.$router.push(`/talk/${this.bo_id}-${this.us_id}`);
    },
  },
};
</script>

<style></style>
