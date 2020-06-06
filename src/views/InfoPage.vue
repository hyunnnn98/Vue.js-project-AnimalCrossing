<template>
  <ion-content class="ion-padding info">
    <AppHeader :head_name="title"></AppHeader>
    <InfoContent :us_info="us_info" :us_id="us_id"></InfoContent>
    <InfoTrade></InfoTrade>
    <InfoComment></InfoComment>
    <InfoMenu></InfoMenu>
  </ion-content>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';
import InfoContent from '@/components/Info/InfoContent';
import InfoTrade from '@/components/Info/InfoTrade';
import InfoComment from '@/components/Info/InfoComment';
import InfoMenu from '@/components/Info/InfoMenu';

export default {
  name: 'InfoPage',
  components: { AppHeader, InfoContent, InfoTrade, InfoComment, InfoMenu },
  data() {
    return {
      title: '내정보',
      us_info: {
        us_nickname: this.$store.state.us_nickname,
        us_thumbnail: this.$store.state.us_thumbnail,
        us_islandname: this.$store.state.us_islandname,
      },
      us_id: this.$store.state.us_id,
    };
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
