<template>
  <ul class="post-Picture">
    <li>사진 고르는 박스</li>
    <li>올라간 사진</li>
  </ul>
</template>

<script>
export default {};
</script>

<style>
.post-Picture {
  padding: 10px;
  margin-top: 1em;
  display: flex;
  /* background-color: red; */
}

.post-Picture > li {
  width: 100px;
  height: 100px;
  border: 1.5px solid rgb(66, 66, 66);
  margin-right: 0.5em;
  border-radius: 5px;
}
</style>
