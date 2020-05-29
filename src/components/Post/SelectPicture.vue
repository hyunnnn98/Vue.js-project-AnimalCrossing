<template>
  <ul class="post-Picture">
    <li @click="talk_picture"></li>
    <li
      @click="submit_thumbnail(i)"
      v-for="(picture, i) in imageUrl"
      :key="picture"
    >
      <img :src="imageUrl[i] ? imageUrl[i] : null" />
      <ion-icon
        @click="deleteUrl(i)"
        class="delete-picture"
        name="close-circle"
      ></ion-icon>
    </li>
  </ul>
</template>

<script>
import { EventBus } from '@/utils/bus';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
const { Device } = Plugins;

export default {
  name: 'post-picture',
  data() {
    return {
      imageUrl: [],
      blobs: [],
      formData: null,
      device_info: null,
    };
  },
  async mounted() {
    this.formData = new FormData();
    const data = await Device.getInfo();
    this.device_info = await data.platform;
  },
  created() {
    EventBus.$on('send_imgs', async bo_id => {
      await this.image_submit(bo_id);
      this.imageUrl = [];
      this.blobs = [];
      this.formData.delete('img');
    });
  },
  methods: {
    async talk_picture() {
      // DeviceInfo 보고 사용자 구분하기

      console.log(this.device_info);
      if (this.device_info != 'web') {
        try {
          const image = await Camera.getPhoto({
            quality: 20,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Prompt,
            promptLabelPhoto: '앨범에서 가져오기',
            promptLabelPicture: '직접촬영',
          });

          // 이미지파일 dataUrl 저장
          let dataUrl = image.dataUrl;
          this.imageUrl.push(dataUrl);

          let block = dataUrl.split(';');
          let contentType = block[0].split(':')[1]; // In this case "image/gif"
          let realData = block[1].split(',')[1]; // In this case "iVBORw0KGg...."
          let blob = this.b64toBlob(realData, contentType);

          // 생성된 blob 객체 배열 저장
          this.blobs.push(blob);
        } catch (err) {
          console.log('err', err);
          // alert('err: ' + err);
        }
      } else {
        alert('모바일이 아닙니다!');
      }
    },
    async image_submit(bo_id) {
      await this.blobs.forEach((item, index) => {
        this.formData.append('img', item);
      });
      try {
        const req = new XMLHttpRequest();
        req.open('POST', 'https://server.anicro.org/board/image', true);
        req.setRequestHeader('bo_id', bo_id);
        req.send(this.formData);
      } catch (error) {
        alert(error);
      }
    },
    deleteUrl(index_number) {
      this.imageUrl.splice(index_number, 1);
      this.blobs.splice(index_number, 1);
    },
    b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      let byteCharacters = atob(b64Data);
      let byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      let blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    submit_thumbnail(index_number) {
      console.log(index_number);
      if (this.imageUrl.length == 0) EventBus.$emit('thumbnail_change', 5);
      else EventBus.$emit('thumbnail_change', index_number);
      // const all_of_li = document.querySelector(
      //   `.post-Picture li:nth-child(2n+1)`,
      // );
      // const selected_li = document.querySelector(
      //   `.post-Picture > li:nth-child(n + ${index_number})`,
      // );
      // all_of_li.style.border = '2px solid rgb(66, 66, 66)';
      // selected_li.style.border = '2px solid rgb(236, 75, 0)';
    },
  },
};
</script>

<style>
.post-Picture {
  padding: 10px;
  margin-top: 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
}

.post-Picture::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.post-Picture > li {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border: 2px solid rgb(66, 66, 66);
  margin-right: 0.5em;
  border-radius: 5px;
  overflow: hidden;
}

.post-Picture > li:nth-child(1) {
  background-image: url('../../imgs/camera.png');
  background-repeat: no-repeat;
  background-position-x: 1.2em;
  background-position-y: 1em;
  background-color: rgba(245, 241, 10, 0.274);
}

.delete-picture {
  float: right;
  /* position: relative; */
  /* top: -95px;
  left: 75px; */
  /* top: -17px;
  left: 75px; */
  display: block;
  font-size: 1.5em;
  color: rgb(184, 20, 20);
  cursor: pointer;
  z-index: 100;
}
</style>
