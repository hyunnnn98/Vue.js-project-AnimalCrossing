<template>
  <ion-content class="ion-padding post">
    <div class="post-Header">
      게시글 작성
      <ion-icon name="arrow-back" @click="$router.push('/main')"></ion-icon>
    </div>
    <SelectPicture></SelectPicture>
    <PostContent></PostContent>
  </ion-content>
</template>

<script>
import SelectPicture from '@/components/Post/SelectPicture';
import PostContent from '@/components/Post/PostContent';

import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
export default {
  name: 'PostPage',
  components: {
    SelectPicture,
    PostContent,
  },
  data() {
    return {};
  },
};
</script>

<style>
.post-Header {
  /* background-color: red; */
  text-align: center;
  height: 20px;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -2px;
}

.post-Header ion-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
}
</style>
