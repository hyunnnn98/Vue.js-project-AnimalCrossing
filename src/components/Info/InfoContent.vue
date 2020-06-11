<template>
  <div class="myinfo-main info-bcg">
    <p class="myinfo-title">-- PASSPORT --</p>
    <div class="myinfo">
      <div class="myinfo-imgwrap">
        <div
          @change="us_id != null ? updateThumbnail() : null"
          v-if="device_info == 'web'"
          class="myinfo-Img"
        >
          <label for="postImageFileOpenInput">
            <img :src="`${us_info.us_thumbnail}`" alt="썸네일" />
          </label>
          <input
            type="file"
            id="postImageFileOpenInput"
            ref="uploadImageFile"
            accept="image/png, image/jpeg"
          />
        </div>
        <div
          v-else
          class="myinfo-Img"
          @click="us_id != null ? updateThumbnail() : null"
        >
          <img :src="`${us_info.us_thumbnail}`" alt="썸네일" />
        </div>
      </div>
      <div class="myinfo-Data">
        <ul>
          <li>
            <span class="myinfo-island">
              <img src="../../imgs/green_island.png" alt="그린섬" />
            </span>
            <span class="myinfo-islandTitle">
              {{ us_info.us_islandname }}섬
            </span>
            <!-- <span class="myinfo-island"></span> -->
          </li>
          <li>
            <span class="myinfo-nickName">{{ us_info.us_nickname }}</span>
          </li>
          <li v-if="us_id">
            <span class="myinfo-codeName">* 통신코드</span>
            <span class="myinfo-code">{{ us_code }}</span>
            <img
              class="myinfo-update"
              src="../../imgs/pencil.png"
              alt="수정"
              @click="updateCode"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index';
import InfoCodeModal from './InfoCodeModal';
import { toastErrorController } from '@/utils/toastController';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
import { valideImageType, b64toBlob } from '@/utils/imgControl';
const { Camera } = Plugins;
const { Device } = Plugins;

export default {
  props: ['us_info', 'us_id'],
  data() {
    return {
      us_nickname: store.state.us_nickname,
      us_islandname: store.state.us_islandname,
      us_code: null,
      us_thumbnail: store.state.us_thumbnail,
      blobs: null,
      formData: null,
      device_info: null,
      uploadImageFile: null,
    };
  },
  async mounted() {
    if (this.us_id) {
      this.formData = new FormData();
      const { platform } = await Device.getInfo();
      this.device_info = platform;
    }
    this.us_code = store.state.us_code.replace(
      /(\d{4})(\d{4})(\d{4})/,
      '$1 - $2 - $3',
    );
  },
  methods: {
    async updateThumbnail() {
      console.log('섬네일변경 요청!!');
      await this.handleFileUpload();
      await this.formData.append('img', this.blobs);
      console.log(this.formData);
      try {
        console.log('마지막 this.blobs: ', this.blobs);
        const req = new XMLHttpRequest();
        req.open(
          'POST',
          'https://server.anicro.org/user/change_thumbnail',
          true,
        );
        req.setRequestHeader('us_id', this.us_id);
        req.send(this.formData);
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
      this.initForm();
    },
    async handleFileUpload() {
      // DeviceInfo 보고 사용자 구분하기
      if (this.device_info != 'web') {
        try {
          const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Prompt,
            promptLabelPhoto: '앨범에서 가져오기',
            promptLabelPicture: '직접촬영',
          });

          // 이미지파일 dataUrl 저장
          let dataUrl = image.dataUrl;
          this.us_info.us_thumbnail = dataUrl;

          let block = dataUrl.split(';');
          let contentType = block[0].split(':')[1]; // In this case "image/gif"
          let realData = block[1].split(',')[1]; // In this case "iVBORw0KGg...."
          let blob = b64toBlob(realData, contentType);

          // 생성된 blob 객체 배열 저장
          console.log('this.blobs: ', this.blobs);
          this.blobs = blob;
        } catch (err) {
          console.log('err', err);
        }
      } else {
        const image = await this.$refs.uploadImageFile.files[0];
        if (!valideImageType(image)) return;
        let reader = new FileReader();
        reader.onload = e => {
          this.us_info.us_thumbnail = e.target.result;
        };
        reader.readAsDataURL(image);
        this.blobs = image;
      }
    },
    initForm() {
      this.formData = new FormData();
      this.blobs = null;
      this.uploadImageFile = null;
    },
    async updateCode() {
      let modal = await this.$ionic.modalController.create({
        component: InfoCodeModal,
        cssClass: 'code-modal-css',
        componentProps: {
          propsData: {
            us_id: this.$store.state.us_id,
          },
        },
      });
      modal.present();
    },
  },
};
</script>

<style></style>
