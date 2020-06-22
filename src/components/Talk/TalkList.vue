<template>
  <div class="talk-list">
    <AppHeader :head_name="title" :head_css="css"></AppHeader>
    <ion-content
      class="talk-scroll"
      :scrollEvents="true"
      @ionScroll="logScrolling($event)"
    >
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
        <li class="chat-out" v-if="ro_exit != 0">
          {{ us_nickname }}님이 채팅방에서 나갔습니다.
        </li>
      </ul>
    </ion-content>
    <div class="fix-bottom">
      <div class="talk_info">
        <ion-icon class="talk_bar" name="menu"></ion-icon>
        <ul class="talk_btn">
          <li v-if="access && bo_trade_status == 0" @click="trade_access">
            승인요청
          </li>
          <li @click="report_modal">신고하기</li>
          <li @click="talk_out">나가기</li>
        </ul>
      </div>
      <ion-textarea
        type="text"
        :value="us_input_value"
        :disabled="other_us_grant == -1"
        @keydown="enterKeytoPush"
        @keyup="enterKeytoClean"
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
import AppHeader from '@/components/common/AppHeader';

export default {
  name: 'TalkRoom',
  components: {
    AppHeader,
  },
  data() {
    return {
      title: '',
      css: 'fix-header',
      us_nickname: '',
      us_input_value: '',
      us_id: parseInt(this.$store.state.us_id),
      ro_trade_status: 0,
      ro_exit: 0,
      chat_data: [],
      ch_ro_id: this.$route.params.id,
      access: false,
      other_us_grant: null,
      bo_trade_status: 0,
    };
  },
  created() {
    // [초기화]  채팅메시지 불러오기.
    this.$store.state.socket.on('get_message', res => {
      console.log(res);
      if (res === false) this.$router.push('/main');
      this.other_us_grant = res.us_grant;
      this.ro_trade_status = res.ro_trade_status;
      this.us_nickname = res.us_nickname;
      this.title = res.ro_bo_title;
      this.ro_exit = res.ro_exit;
      this.bo_trade_status = res.bo_trade_status;

      if (res.chat[0].ch_send_us_id != this.us_id) this.access = true;
      if (this.other_us_grant === -1) {
        this.us_input_value = '2차 사기로 확산방지로 채팅을 제한합니다.';
        toastController(
          this.$ionic,
          '(주의) 사기 거래로 신고된 유저입니다.',
          'danger',
        );
      } else if (this.bo_trade_status == 1 && this.access == false) {
        toastController(
          this.$ionic,
          '(주의) 거래완료 처리된 게시글입니다.',
          'danger',
        );
      }

      // 사용자 구별
      const new_date = new Date();
      res.chat.forEach(v => {
        let return_date = dateFormat(new_date, v.createdAt, 'chat');
        v.createdAt = return_date;
      });
      this.chat_data = res.chat;
      this.scroll_to_bottom();
    });

    // 새로운 채팅메시지 불러오기.
    this.$store.state.socket.on('send_message', async res => {
      const new_date = new Date();
      let return_date = dateFormat(new_date, res.createdAt, 'chat');
      res.createdAt = return_date;

      // 내가 보냈을 때만 스크롤 하단으로 가기.
      this.chat_data.push(res);
      if (this.us_id == res.ch_send_us_id) this.scroll_to_bottom(500);
    });

    // bo_status 상태값 바인딩 받기.
    this.$store.state.socket.on('request_trade_access', res => {
      this.ro_trade_status = res;
    });

    // 상대방이 채팅방 나갔을 시 메시지 받기
    this.$store.state.socket.on('delete_room', res => {
      this.ro_trade_status = res;
    });
  },
  mounted() {
    // [초기화] 새로운 채팅 받아오기.
    this.$store.state.socket.emit('get_message', this.us_id, this.ch_ro_id);
  },
  beforeDestroy() {
    this.$store.state.socket.off('get_message');
    this.$store.state.socket.off('delete_room');
    this.$store.state.socket.off('send_message');
    this.$store.state.socket.off('request_trade_access');
    this.$store.state.socket.emit('leave_room', this.us_id, this.ch_ro_id);
  },
  methods: {
    send_message() {
      if (this.us_input_value == '' || this.other_us_grant === -1) return;
      // 새로운 채팅메시지 보내기.
      this.$store.state.socket.emit(
        'send_message',
        this.us_id,
        this.ch_ro_id,
        this.us_input_value,
      );

      this.us_input_value = '';
    },
    // 거래 관련 알림 전송 컨트롤
    trade_access() {
      let status = this.ro_trade_status;
      if (this.access == false && status === 4) {
        this.ro_trade_status++;
        return this.review_modal();
      }

      let buyer_check = this.access == false && status != 4;
      let seller_check = this.access == true && (status == 0 || status == 2);

      if (buyer_check || seller_check) {
        this.$store.state.socket.emit(
          'request_trade_access',
          this.us_id,
          this.ch_ro_id,
        );
      }
    },
    // 엔터키 채팅 푸쉬
    enterKeytoPush(input_value) {
      if (input_value.key == 'Enter') {
        this.send_message();
      }
    },
    enterKeytoClean(input_value) {
      if (input_value.key == 'Enter') this.us_input_value = '';
    },
    // 하단 스크롤
    scroll_to_bottom(time) {
      const tag = document.querySelector('.talk-scroll');
      tag.scrollToBottom(time);
    },
    // 채팅방 나가기
    talk_out() {
      this.$store.state.socket.emit('delete_room', this.us_id, this.ch_ro_id);
      this.$router.push('/talk');
    },
    // 신고 모달
    async report_modal() {
      let modal = await this.$ionic.modalController.create({
        component: TalkReportModal,
        cssClass: 'talk-modal-css',
        componentProps: {
          propsData: {
            us_id: this.us_id,
            ro_id: this.ch_ro_id,
          },
        },
      });
      modal.present();
    },
    // 리뷰 모달
    async review_modal() {
      let modal = await this.$ionic.modalController.create({
        component: TalkReviewModal,
        cssClass: 'code-modal-css',
        componentProps: {
          propsData: {
            us_id: this.us_id,
            ch_ro_id: this.ch_ro_id,
          },
        },
      });
      modal.present();
    },
  },
};
</script>

<style>
@import url('../../css/TALK.css');
</style>
