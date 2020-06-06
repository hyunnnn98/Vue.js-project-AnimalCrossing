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
      //TODO 다른 유저가 채팅방 무단 침입 막기.
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
      console.log('클릭!');
      let status = this.bo_trade_status;
      let buyer_check = this.access == false && status != 4;
      let seller_check = this.access == true && (status == 0 || status == 2);

      if (buyer_check || seller_check) {
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
  },
};
</script>

<style>
.talk-list {
  max-width: none;
  max-height: 100%;
  min-height: 300px;
  background-image: url('../../imgs/chat-background.png');
  background-size: cover;
  overflow-y: scroll;
}

.talk-list::-webkit-scrollbar,
.talk-list > ul::-webkit-scrollbar {
  display: none;
}

.talk-list > ul {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 60px;
  width: 100%;
  overflow-y: scroll;
}

.talk-list > ul > li {
  flex: 1;
  padding: 10px;
  /* border-bottom: 1px solid black; */
  /* width: 50%; */
}

.talk-list > ul > li > p {
  display: inline-block;
  padding: 10px;
}

.fix-bottom,
.fix-header {
  display: flex;
  position: fixed;
  width: 100%;
  padding: 10px;
  margin: 0px;
  background-color: white;
}

.fix-header {
  top: 0px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -1px;
  z-index: 100;
  color: black;
}

.fix-header ion-icon {
  margin-right: 0.5em;
  font-weight: bold;
  font-size: 1.3em;
}

.fix-header img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 15px;
}

.fix-bottom {
  bottom: 0px;
  left: 0px;
  height: 60px;
}

.fix-bottom > ion-textarea {
  margin-left: 1em;
  text-align: left;
  --padding-top: 5px;
  --padding-end: 0px;
  --padding-bottom: 0px;
  --padding-start: 0px;
}

.fix-bottom textarea {
  text-indent: 0px !important;
  overflow-y: hidden;
}

.fix-bottom .btn_send {
  background-color: rgb(110, 175, 216);
  text-align: center;
  line-height: 40px;
  font-weight: 700;
  height: 40px;
  width: 60px;
  border-radius: 10px;
  letter-spacing: 2px;
  box-shadow: 0px 1px 5px rgb(88, 88, 88);
  background-image: url('../../imgs/send.png');
  background-size: 2em;
  background-repeat: no-repeat;
  background-position-x: 1em;
  background-position-y: 0.5em;
  cursor: pointer;
}

.btn_send.disabled {
  background-color: rgb(182, 195, 202);
}

.chat {
  border-radius: 10px;
  max-width: 300px;
}

.sender {
  text-align: right;
}

.chat.receiver {
  background-color: white;
  box-shadow: 0px 3px 8px rgb(88, 88, 88);
  white-space: pre-wrap;
}
.chat.sender {
  background-color: rgb(255, 232, 28);
  box-shadow: -1px 3px 8px rgb(88, 88, 88);
  text-align: left;
  white-space: pre-wrap;
}

.btn-request {
  display: block;
  margin: 10px 0px 0px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(228, 228, 228);
  color: rgb(46, 46, 46);
  text-align: center;
  font-weight: 700;
  transition-duration: 0.5s;
}

.btn-request:hover {
  background-color: rgb(204, 204, 204);
}

.chat.sender.bcg_white {
  border-radius: 5px;
  background-color: white;
}

.sender .time {
  font-size: 0.8em;
  position: relative;
  right: 5px;
  bottom: -8px;
}

.sender .read {
  position: relative;
  font-size: 0.7em;
  top: -9px;
  left: 38px;
}

.receiver .time {
  font-size: 0.8em;
  position: relative;
  left: 5px;
  bottom: -8px;
}

.receiver .read {
  position: relative;
  font-size: 0.7em;
  top: -9px;
  right: 38px;
}

.talk-modal-css {
  --width: 100% !important;
  --height: 100% !important;
}

@media only screen and (min-height: 600px) and (min-width: 768px) {
  .talk-modal-css {
    --width: 50% !important;
    --height: 95% !important;
    --max-width: 600px;
  }
}
</style>
