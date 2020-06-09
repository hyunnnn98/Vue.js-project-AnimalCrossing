<template>
  <div class="modal-category">
    <ion-content class="category-body">
      <div class="category-content">
        <ModalHeader class="category-header" :modal_title="title"></ModalHeader>
        <ul class="category-ul">
          <li
            @click="selectMenu(category.ca_id)"
            v-for="category in categorys"
            :key="category.ca_id"
          >
            <p></p>
            <h4>{{ category.ca_contents }}</h4>
          </li>
        </ul>
      </div>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '@/utils/bus';
import ModalHeader from '../common/ModalHeader';

export default {
  name: 'category_modal',
  components: {
    ModalHeader,
  },
  data() {
    return {
      select: null,
      title: '카테고리',
    };
  },
  props: {
    categorys: {
      type: Array,
    },
  },
  created() {
    EventBus.$on('category_list', category => {
      console.log('이벤트버스로 받은 카테고리:', category);
    });
  },
  methods: {
    selectMenu(menu) {
      console.log(menu);
      this.select = menu;
      EventBus.$emit('ca_id_Change', menu);
      this.modalClose(true);
    },
    modalClose(selectCategory) {
      let clickResponse = {
        success: selectCategory,
        selectData: selectCategory ? this.select : null,
      };
      this.$ionic.modalController.dismiss(clickResponse);
    },
  },
};
</script>

<style></style>
