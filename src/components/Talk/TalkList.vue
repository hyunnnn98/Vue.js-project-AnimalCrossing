<template>
  <div class="talk-list">
    챗팅방이 나열 될 예정입니다.
    <ul>
      <li>안녕?</li>
      <li>안녕</li>
      <li>ㄱ</li>
      <li>ㄴ</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.talk-list {
  overflow-y: scroll;
  max-width: none;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translateX(-50%) translateY(-50%);
  background-color: rgb(255, 255, 255);
}

.talk-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.talk-list > ul {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.talk-list > ul > li {
  flex: 1; /* flex: 1 1 0 */
  /* background-color: red; */
  padding: 20px;
  margin: 5px 0;
  width: 50%;
}

.talk-list > ul > li:nth-child(2n) {
  width: 100%;
  text-align: right;
}
</style>
