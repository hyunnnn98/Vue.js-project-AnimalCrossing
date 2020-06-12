<template>
  <ion-fab
    @click="scollToTop()"
    vertical="bottom"
    horizontal="end"
    slot="fixed"
  >
    <ion-fab-button size="small" color="dark">
      <ion-icon name="arrow-up"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
export default {
  methods: {
    scollToTop() {
      const tag = document.querySelector('.home-body');
      console.log('최상단으로 이동!', tag);
      tag.scrollToTop(400);
    },
  },
};
</script>
