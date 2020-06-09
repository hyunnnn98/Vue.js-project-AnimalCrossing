<template>
  <ion-content class="ion-padding post">
    <div class="postPage">
      <AppHeader :head_name="this.title"></AppHeader>
      <SelectPicture></SelectPicture>
      <PostContent></PostContent>
    </div>
  </ion-content>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';
import SelectPicture from '@/components/Post/SelectPicture';
import PostContent from '@/components/Post/PostContent';

import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
export default {
  name: 'PostPage',
  components: {
    AppHeader,
    SelectPicture,
    PostContent,
  },
  data() {
    return {
      title: '게시글 작성',
    };
  },
};
</script>

<style>
@import url('../css/POST.css');
</style>
