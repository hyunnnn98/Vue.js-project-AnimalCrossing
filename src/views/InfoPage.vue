<template>
  <ion-content class="ion-padding info">
    <PostHeader :head_name="title"></PostHeader>
    <InfoContent :us_info="us_info"></InfoContent>
    <button @click="logout_submit">로그아웃</button>
  </ion-content>
</template>

<script>
import { logOut } from '@/api/auth';
import PostHeader from '@/components/Post/PostHeader';
import InfoContent from '@/components/Info/InfoContent';

export default {
  name: 'InfoPage',
  components: { PostHeader, InfoContent },
  data() {
    return {
      title: '내정보',
      us_info: {
        us_nickname: this.$store.state.us_nickname,
        us_thumbnail: this.$store.state.us_thumbnail,
        us_islandname: this.$store.state.us_islandname,
      },
    };
  },
  methods: {
    async logout_submit() {
      const data = { us_id: this.$store.state.us_id };
      const logout_info = await logOut(data);
      if (logout_info) {
        await this.$store.dispatch('LOGOUT');
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style>
.info {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
}
</style>
