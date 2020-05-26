<template>
  <div class="talk">
    챗팅방이 나열 될 예정입니다.
    <ul>
      <TalkBox :room_id="talk" v-for="talk in talks" :key="talk"></TalkBox>
    </ul>
  </div>
</template>

<script>
import TalkBox from '@/components/Talk/TalkBox.vue';

export default {
  name: 'TalkPage',
  components: {
    TalkBox,
  },
  data() {
    return {
      talks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    };
  },
};
</script>

<style>
.talk {
  overflow-y: scroll;
  max-width: none;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translateX(-50%) translateY(-50%);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 5px;
  /* background-color: black; */
  /* margin: 0 10px; */
}

.talk::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
