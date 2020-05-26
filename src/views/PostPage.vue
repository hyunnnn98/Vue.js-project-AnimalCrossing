<template>
  <ion-content class="ion-padding post">
    <div class="postPage">
      <PostHeader :head_name="this.title"></PostHeader>
      <SelectPicture></SelectPicture>
      <PostContent></PostContent>
    </div>
  </ion-content>
</template>

<script>
import PostHeader from '@/components/Post/PostHeader';
import SelectPicture from '@/components/Post/SelectPicture';
import PostContent from '@/components/Post/PostContent';

import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
export default {
  name: 'PostPage',
  components: {
    PostHeader,
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
@media (min-width: 520px) {
  .postPage {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
