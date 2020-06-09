<template>
  <div class="talk-list">
    <div class="fix-header">
      <ion-icon name="arrow-back" @click="$router.push('/talk')" />
      <span>사기거래에 주의하세요!!</span>
      <img src="../../imgs/alert.png" alt="신고" @click="report_modal" />
    </div>
    <ul>
      <li
        :class="chat.ch_send_us_id == us_id ? 'sender' : 'receiver'"
        v-for="(chat, index) in chat_data"
        :key="index"
      >
        <template
          v-if="
            !(
              chat.ch_request &&
              chat.request.rq_content == '후기 작성' &&
              access == true
            )
          "
        >
          <template v-if="us_id == chat.ch_send_us_id">
            <span class="chat read" v-if="chat.ch_read == 0">읽음</span>
            <span class="chat time">{{ chat.createdAt }}</span>
          </template>
          <p
            class="chat"
            :class="[
              chat.ch_request != 0 ? 'bcg_white' : '',
              us_id == chat.ch_send_us_id ? 'sender' : 'receiver',
            ]"
          >
            {{ chat.ch_content }}
            <span
              @click="trade_access"
              v-if="chat.ch_request"
              class="btn-request"
            >
              {{ chat.request.rq_content }}
            </span>
          </p>
          <template v-if="us_id != chat.ch_send_us_id">
            <span class="chat time">{{ chat.createdAt }}</span>
            <span class="chat read" v-if="chat.ch_read == 0">읽음</span>
          </template>
        </template>
      </li>
    </ul>
    <div class="fix-bottom">
      <ion-buton
        v-if="access"
        class="btn_send"
        @click="trade_access"
        :class="bo_trade_status == 1 ? 'disabled' : null"
        expand="block"
      ></ion-buton>
      <ion-textarea
        type="text"
        :value="us_input_value"
        :disabled="other_us_grant == -1"
        @input="us_input_value = $event.target.value"
        placeholder="채팅을 입력해주세요."
        clear-on-edit="true"
      ></ion-textarea>
      <ion-buton
        class="btn_send"
        @click="send_message"
        :disabled="!us_input_value || other_us_grant == -1"
        :class="!us_input_value || other_us_grant == -1 ? 'disabled' : null"
        type="submit"
        expand="block"
      ></ion-buton>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat';
import { toastController } from '@/utils/toastController';
import TalkReportModal from './TalkReportModal';
import TalkReviewModal from './TalkReviewModal';

export default {
  name: 'TalkRoom',
  data() {
    return {
      bo_trade_status: 0,
      us_input_value: '',
      chat_data: [],
      us_id: parseInt(this.$store.state.us_id),
      room_id: this.$route.params.id,
      access: false,
      other_us_grant: null,
    };
  },
  created() {
    // [초기화]  채팅메시지 불러오기.
    this.$store.state.socket.on('get_message', res => {
      console.log(res);
      if (res === false) this.$router.push('/main');
      this.other_us_grant = res.us_grant;
      this.bo_trade_status = res.bo_trade_status;

      if (this.other_us_grant === -1) {
        console.log('여기!');
        this.us_input_value = '2차 사기로 확산방지로 채팅을 제한합니다.';
        toastController(
          this.$ionic,
          '(주의) 사기 거래로 신고된 유저입니다.',
          'danger',
        );
      }
      if (res.chat[0].ch_send_us_id != this.us_id) this.access = true;
      const new_date = new Date();
      res.chat.forEach(v => {
        let return_date = dateFormat(new_date, v.createdAt, 'chat');
        v.createdAt = return_date;
      });
      this.chat_data = res.chat;
    });

    // 새로운 채팅메시지 불러오기.
    this.$store.state.socket.on('send_message', async res => {
      console.log('새롭게 받은 메시지', res);
      const new_date = new Date();
      let return_date = dateFormat(new_date, res.createdAt, 'chat');
      res.createdAt = return_date;
      this.chat_data.push(res);
    });

    // bo_status 상태값 바인딩 받기.
    this.$store.state.socket.on('request_trade_access', res => {
      this.bo_trade_status = res;
    });
  },
  mounted() {
    // [초기화] 새로운 채팅 받아오기.
    this.$store.state.socket.emit('get_message', this.us_id, this.room_id);
  },
  beforeDestroy() {
    this.$store.state.socket.off('get_message');
    this.$store.state.socket.off('send_message');
    this.$store.state.socket.off('request_trade_access');
    this.$store.state.socket.emit('leave_room', this.us_id, this.room_id);
  },
  methods: {
    send_message() {
      if (this.us_input_value == '' || this.other_us_grant === -1) return;
      // 새로운 채팅메시지 보내기.
      this.$store.state.socket.emit(
        'send_message',
        this.us_id,
        this.room_id,
        this.us_input_value,
      );

      this.us_input_value = '';
    },
    trade_access() {
      // 거래 관련 알림 전송 컨트롤
      let status = this.bo_trade_status;
      if (this.access == false && status === 4) return this.review_modal();

      console.log('클릭!');
      let buyer_check = this.access == false && status != 4;
      let seller_check = this.access == true && (status == 0 || status == 2);

      console.log('buyer_check: ', buyer_check);
      console.log('seller_check: ', seller_check);
      if (buyer_check || seller_check) {
        console.log('들어왔음!');
        this.$store.state.socket.emit(
          'request_trade_access',
          this.us_id,
          this.room_id,
        );
      }
    },
    async report_modal() {
      let modal = await this.$ionic.modalController.create({
        component: TalkReportModal,
        cssClass: 'talk-modal-css',
        componentProps: {
          propsData: {
            us_id: this.us_id,
            room_id: this.room_id,
          },
        },
      });
      modal.present();
    },
    async review_modal() {
      let modal = await this.$ionic.modalController.create({
        component: TalkReviewModal,
        cssClass: 'code-modal-css',
        componentProps: {
          propsData: {
            us_id: this.us_id,
            room_id: this.room_id,
          },
        },
      });
      modal.present();
    },
  },
};
</script>

<style></style>
