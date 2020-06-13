<template>
  <div class="modal-reportList">
    <ModalHeader :modal_title="title"></ModalHeader>

    <ion-content class="ion-padding qu-body">
      <ul v-if="no_lists != ''" class="qu-list">
        <li v-for="(list, index) of no_lists" :key="index">
          <div class="qu-title" @click="change_view(index)">
            <span class="qu-co">
              패치노트
            </span>
            {{ list.no_title }}
          </div>
          <div style="display:none;" class="qu-content"></div>
        </li>
      </ul>
      <p v-else>공지사항이 없습니다.</p>
    </ion-content>
  </div>
</template>

<script>
import store from '@/store/index';
import ModalHeader from '@/components/common/ModalHeader';
import { toastErrorController } from '@/utils/toastController';
import { getNotice } from '@/api/report';

export default {
  props: ['us_id'],
  components: {
    ModalHeader,
  },
  data() {
    return {
      title: '공지사항',
      no_title: null,
      no_category: null,
      no_lists: null,
      click_view: -1,
    };
  },
  async mounted() {
    try {
      // 공지사항 로딩 이벤트
      const { data } = await getNotice();
      this.no_lists = data.info;
      console.log(data);
    } catch (err) {
      toastErrorController(this.$ionic, err);
    }
  },
  methods: {
    change_view(_id) {
      const tag = document.querySelectorAll('.qu-content');
      tag.forEach((v, index) => {
        if (index == _id && this.click_view != _id) {
          v.innerHTML = this.no_lists[index].no_content;
          v.style.display = 'block';
          this.click_view = _id;
        } else if (index == _id && this.click_view == _id) {
          this.click_view = -1;
          v.style.display = 'none';
        } else {
          v.style.display = 'none';
        }
      });
    },
  },
};
</script>

<style></style>
