<template>
  <li class="itembox">
    <div class="post-title">
      게시글 제목
    </div>
    <div class="post-contents">
      게시글 내용
    </div>
    <div class="post-time">
      작성된 시간
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style>
.itembox {
  position: relative;
  flex-grow: 1;
  width: 300px;
  height: 100px;
  margin: 5px 3px;
  padding: 10px 20px;
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}
</style>
