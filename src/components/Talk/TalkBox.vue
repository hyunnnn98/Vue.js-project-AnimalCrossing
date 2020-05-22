<template>
  <li class="talk-box">
    <div class="talk-avater">아바타 그림</div>
    <div class="talk-content">아바타 그림</div>
    <div class="talk-info">아바타 그림</div>
  </li>
</template>

<script>
export default {};
</script>

<style>
.talk-box {
  flex: 1;
  background-color: red;
  margin: 5px 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}

.talk-avater {
  background-color: yellowgreen;
  flex-grow: 0.5;
}

.talk-content {
  flex-grow: 4;
}

.talk-info {
  flex-grow: 0.5;
  background-color: blue;
}
</style>
