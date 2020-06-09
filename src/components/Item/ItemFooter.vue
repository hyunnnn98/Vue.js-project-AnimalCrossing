<template>
  <div class="itemFooter">
    <div v-if="this.item_data.bo_us_id == us_id" class="pi-bottom">
      <div @click="post_show" class="pi-input-show">
        게시글 {{ this.pi_show }}
      </div>
      <div @click="post_delete" class="pi-input-delete">삭제</div>
      <div @click="post_edit" class="pi-input-modify">수정</div>
    </div>
    <div v-else class="pi-bottom">
      <div @click="busLikeHate(0)" class="pi-input-like">
        <img src="../../imgs/like_1.png" alt="" />
        좋아요
      </div>
      <div @click="busLikeHate(1)" class="pi-input-bad">
        <img src="../../imgs/bad_1.png" alt="" />
        싫어요
      </div>
      <div @click="create_room()" class="pi-input-talk">
        <img src="../../imgs/main_home.png" alt="" />
        거래하기
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';
import { toastController } from '@/utils/toastController';
import { setLikeHate, showPost, deletePost } from '@/api/post';
import store from '../../store/index';
import router from '../../router/index';

export default {
  props: ['us_id', 'item_data'],
  data() {
    return {
      pi_show: '공개',
    };
  },
  mounted() {
    console.log(this.us_id);
    this.item_data.bo_show == 0
      ? (this.pi_show = '공개')
      : (this.pi_show = '비공개');
  },
  methods: {
    async create_room() {
      if (store.state.us_grant === -1) {
        let msg =
          '위험한 유저로 신고 처리되어, 거래 서비스 이용이 불가합니다. \n1:1 게시판을 이용해 신고내역을 확인해주세요.';
        toastController(this.$ionic, msg, 'warning');
        return;
      }

      await store.commit('setSocket');
      await store.state.socket.emit(
        'create_room',
        parseInt(this.us_id),
        parseInt(this.item_data.bo_id),
      );
      await this.$ionic.modalController.dismiss();
      router.push(`/talk/${this.item_data.bo_id}-${this.us_id}`);
    },
    async busLikeHate(selectedVal) {
      const { data } = await setLikeHate(
        this.us_id,
        this.item_data.bo_id,
        selectedVal,
      );
      EventBus.$emit('get_LikeHate', data);
    },
    async post_delete() {
      const result = await deletePost(this.item_data.bo_id, this.us_id);
      //TODO alert 걷어내기!
      if (result) alert('게시물이 삭제되었습니다!');
      else alert('잘못된 접근입니다.!');
      await this.$ionic.modalController.dismiss();
      EventBus.$emit('refresh-post');
    },
    async post_show() {
      this.pi_show == '공개'
        ? (this.pi_show = '비공개')
        : (this.pi_show = '공개');
      const result = await showPost(
        this.item_data.bo_id,
        this.item_data.bo_show,
      );
      if (!result) alert('잘못된 접근입니다.!');
    },
    post_edit() {
      EventBus.$emit('post_update', this.item_data.bo_id);
      router.push(`/post/${this.item_data.bo_id}`);
      this.$ionic.modalController.dismiss();
    },
  },
};
</script>

<style></style>
