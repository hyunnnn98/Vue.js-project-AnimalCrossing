<template>
  <div class="myinfo-main info-bcg">
    <p class="myinfo-title">PASSPORT</p>
    <div class="myinfo">
      <div class="myinfo-imgwrap">
        <div class="myinfo-img-hint" v-if="us_id">
          <p>이미지를 클릭해 썸네일을 변경해보세요!</p>
        </div>
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
              {{ us_info.us_islandname }}
              {{ us_info.us_island_selector == 0 ? '섬' : '도' }}
            </span>
          </li>
          <li>
            <span class="myinfo-nickName">{{ us_info.us_nickname }}</span>
          </li>
          <li v-if="us_id">
            <span class="myinfo-codeName">* 친구코드</span>
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
    <p class="myinfo-createdAt">
      등록 :
      {{ us_id ? createdAt : us_info.createdAt }}
    </p>
  </div>
</template>

<script>
import store from '../../store/index';
import InfoCodeModal from './modal/InfoCodeModal';
import { EventBus } from '@/utils/bus';
import { toastController, toastErrorController } from '@/utils/toastController';
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
      createdAt: store.state.createdAt,
      blobs: null,
      formData: null,
      device_info: null,
      uploadImageFile: null,
    };
  },
  created() {
    // 코드 변경 이벤트 결과처리
    EventBus.$on('change_code', code => {
      this.us_code = code.replace(/(\d{4})(\d{4})(\d{4})/, '$1 - $2 - $3');
    });
  },
  beforeDestroy() {
    EventBus.$off('change_code');
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
      await this.handleFileUpload();
      await this.formData.append('us_id', this.us_id);
      await this.formData.append('img', this.blobs);
      try {
        // 썸네일 변경 비동기처리.
        const req = new XMLHttpRequest();
        req.open(
          'POST',
          `${process.env.VUE_APP_API_URL}change_thumbnail`,
          true,
        );
        req.send(this.formData);
      } catch (err) {
        toastErrorController(this.$ionic, err);
      }
      this.initForm();
    },
    // 사용자로 부터 썸네일 이미지 받기 이벤트
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

          this.blobs = blob;
        } catch (err) {
          toastController(
            this.$ionic,
            '이미지 불러오는중 에러가 발생했습니다.\n 다시 시도해주세요.',
            'danger',
          );
        }
      } else {
        // 유저.platform === 모바일
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
    // 코드 변경 모달 open 이벤트
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
      await modal.present();
    },
  },
};
</script>

<style></style>
