<template>
  <div class="itemFooter">
    <div v-if="this.item_data.bo_us_id == us_id" class="pi-bottom">
      <div @click="post_show" class="pi-input-show">
        게시글 {{ this.pi_show }}
      </div>
      <div @click="post_delete" class="pi-input-delete">삭제</div>
      <div @click="post_edit" class="pi-input-modify">수정</div>
      <div @click="post_end" class="pi-input-end">
        {{ item_data.bo_trade_status == 0 ? '거래중' : '거래완료' }}
      </div>
    </div>
    <div v-else class="pi-bottom">
      <div
        @click="busLikeHate(0)"
        class="pi-input-like"
        :class="`${item_data.likehate}`"
      >
        <img src="../../imgs/like_1.png" alt="" />
        좋아요
      </div>
      <div
        @click="busLikeHate(1)"
        class="pi-input-bad"
        :class="`${item_data.likehate}`"
      >
        <img src="../../imgs/bad_1.png" alt="" />
        싫어요
      </div>
      <div
        v-if="!item_data.chat_exist"
        @click="create_room()"
        class="pi-input-talk"
      >
        <img src="../../imgs/main_home.png" alt="" />
        거래하기
      </div>
      <div v-else @click="join_room()" class="pi-input-talk">
        <img src="../../imgs/main_home.png" alt="" />채팅하기
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';
import { toastController, toastErrorController } from '@/utils/toastController';
import { setLikeHate, showPost, deletePost, setPostStatus } from '@/api/post';
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
    join_room() {
      this.$ionic.modalController.dismiss();
      console.log('test1', this.item_data);
      router.push(`/talk/${this.item_data.ch_ro_id}`);
    },
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
      store.state.socket.on('create_room', async res => {
        console.log('res: ', res);
        await this.$ionic.modalController.dismiss();
        router.push(`/talk/${res}`);
      });
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
      try {
        const result = await deletePost(this.item_data.bo_id, this.us_id);
        toastController(this.$ionic, '게시물이 삭제되었습니다!', 'success');
        await this.$ionic.modalController.dismiss();
        EventBus.$emit('refresh-post');
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    async post_show() {
      this.pi_show == '공개'
        ? (this.pi_show = '비공개')
        : (this.pi_show = '공개');
      try {
        const result = await showPost(
          this.item_data.bo_id,
          this.item_data.bo_show,
        );
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
    post_edit() {
      EventBus.$emit('post_update', this.item_data.bo_id);
      router.push(`/post/${this.item_data.bo_id}`);
      this.$ionic.modalController.dismiss();
    },
    async post_end() {
      try {
        console.log(this.item_data.bo_id, this.item_data.bo_trade_status);
        const result = await setPostStatus(
          this.item_data.bo_id,
          this.item_data.bo_trade_status,
        );
        EventBus.$emit('set_past_trade');
        this.$ionic.modalController.dismiss();

        let msg = '';
        this.item_data.bo_trade_status == 0
          ? (msg = '게시물이 거래완료 상태로 변경되었습니다!')
          : (msg = '게시물이 거래중 상태로 변경되었습니다!');

        toastController(this.$ionic, msg, 'success');
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
    },
  },
};
</script>

<style></style>
