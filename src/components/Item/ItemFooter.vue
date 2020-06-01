<template>
  <div class="pi-bottom">
    <div @click="busLikeHate(0)" class="pi-input-like">좋아요버튼</div>
    <div @click="busLikeHate(1)" class="pi-input-bad">싫어요버튼</div>
    <div @click="create_room()" class="pi-input-talk">거래하기</div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';
import { setLikeHate } from '@/api/post';
import store from '../../store/index';
import router from '../../router/index';

export default {
  props: ['bo_id'],
  data() {
    return {
      us_id: store.state.us_id,
    };
  },
  methods: {
    async create_room() {
      console.log(this.us_id);
      console.log(this.bo_id);
      await store.commit('setSocket');
      await store.state.socket.emit(
        'create_room',
        parseInt(this.us_id),
        parseInt(this.bo_id),
      );
      await this.$ionic.modalController.dismiss();
      router.push(`/talk/${this.bo_id}-${this.us_id}`);
    },
    async busLikeHate(selectedVal) {
      const { data } = await setLikeHate(this.us_id, this.bo_id, selectedVal);
      EventBus.$emit('get_LikeHate', data);
    },
  },
};
</script>

<style></style>
