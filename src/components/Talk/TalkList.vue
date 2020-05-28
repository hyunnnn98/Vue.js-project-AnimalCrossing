<template>
  <div class="talk-list">
    <div class="fix-header">
      <ion-icon name="arrow-back" @click="$router.push('/talk')" />
      <span>코코하세요</span>
      <ion-icon name="search" @click="$router.push('/talk')" />
    </div>
    <ul>
      <li v-for="(chat, index) in chat_data" :key="index">
        <!-- <p :class="`chat${chat}`">{{ chat }}</p> -->
        <p :class="`chat receiver`">{{ chat.ch_content }}</p>
        <span class="chat time">오후 13:00</span>
        <span class="chat read" v-if="chat.ch_read == 0">읽음</span>
        <!-- //TODO class 발신 : 수신 구분해서 뿌려주기. -->
      </li>
      <!-- <li>
        <p :class="`chat sender`">판매자님 안녕하세요!</p>
        <span class="chat time">오후 13:00</span>
      </li>
      <li>
        <p :class="`chat sender`">
          판매자님 안녕하세요! 동해물과백두산이 마르고 닳도록 하느님이 보우하사
          우리나라만세
        </p>
        <span class="chat time">오후 13:00</span>
      </li>
      <li>
        <p :class="`chat receiver`">아 네네!! 안녕하세요!</p>
        <span class="chat time">오후 13:00</span>
      </li>
      <li>
        <p :class="`chat receiver`">아 네네!! 안녕하세요!</p>
        <span class="chat time">오후 13:00</span>
      </li>
      <li>
        <p :class="`chat sender`">판매자님 안녕하세요!</p>
        <span class="chat time">오후 13:00</span>
      </li>
      <li>
        <p :class="`chat receiver`">아 네네!! 안녕하세요!</p>
        <span class="chat time">오후 13:00</span>
      </li> -->

      <!-- <li>마지막대화</li> -->
    </ul>
    <form action="#">
      <div class="fix-bottom">
        <ion-textarea
          type="text"
          :value="us_input_value"
          @input="us_input_value = $event.target.value"
          clear-on-edit="true"
          placeholder="채팅을 입력해주세요."
        ></ion-textarea>
        <ion-buton
          @click="send_message"
          type="submit"
          class="btn_send"
          expand="block"
          >전송</ion-buton
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TalkRoom',
  data() {
    return {
      us_input_value: '',
      chat_data: [],
      us_id: parseInt(this.$store.state.us_id),
      room_id: this.$route.params.id,
    };
  },
  created() {
    // 초기값 채팅메시지 불러오기.
    this.$store.state.socket.on('get_message', res => {
      console.log('초기값 메시지', res);
      this.chat_data = res;
    });

    // 새로운 채팅메시지 불러오기.
    this.$store.state.socket.on('send_message', res => {
      console.log('새롭게 받은 메시지', res);
      this.chat_data.push(res);
    });
  },
  mounted() {
    // 새로운 채팅 받아오기.
    this.$store.state.socket.emit('get_message', this.room_id);
  },
  beforeDestroy() {
    this.$store.state.socket.off('get_message');
    this.$store.state.socket.off('send_message');
    this.$store.state.socket.emit('leave_room', this.us_id, this.room_id);
  },
  methods: {
    send_message() {
      console.log('메세지 전송!', this.room_id);
      //TODO 다른 유저가 채팅방 무단 침입 막기.
      // 새로운 채팅메시지 보내기.
      this.$store.state.socket.emit(
        'send_message',
        this.us_id,
        this.room_id,
        this.us_input_value,
      );
    },
  },
};
</script>

<style>
.talk-list {
  max-width: none;
  max-height: 100%;
  min-height: 300px;
  background-color: yellowgreen;
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
  letter-spacing: -2px;
}

.fix-header ion-icon {
  margin-right: 0.5em;
}

.fix-header ion-icon:nth-child(3) {
  /* background-color: red; */
  position: absolute;
  top: 7px;
  right: 10px;
  font-size: 1.5em;
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
  background-color: rgb(180, 206, 255);
  color: black;
  text-align: center;
  line-height: 40px;
  font-weight: 900;
  height: 40px;
  width: 60px;
  border-radius: 10px;
  box-shadow: 0px 1px 5px rgb(88, 88, 88);
}

.chat {
  border-radius: 10px;
  max-width: 300px;
}

.chat.receiver {
  background-color: rgb(255, 232, 28);
  box-shadow: 0px 3px 8px rgb(88, 88, 88);
}
.chat.sender {
  background-color: white;
  box-shadow: -1px 3px 8px rgb(88, 88, 88);
}

.chat.time {
  font-size: 0.8em;
  position: relative;
  left: 5px;
  bottom: -8px;
}

.chat.read {
  position: relative;
  font-size: 0.7em;
  top: -9px;
  right: 47px;
}
</style>
