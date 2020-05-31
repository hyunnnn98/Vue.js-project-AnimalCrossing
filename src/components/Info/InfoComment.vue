<template>
  <ul class="myComment">
    <li class="talk-box">
      <div class="talk-avater">
        <img src="../../imgs/tanuki.png" alt="썸네일" />
      </div>
      <div class="talk-content">
        <p class="talk-title">너굴**</p>
        <p class="info-comment">싸게 거래해주네요!!</p>
        <p class="info-date">2020.05.02</p>
      </div>
    </li>
    <li class="talk-box">
      <div class="talk-avater">
        <img src="../../imgs/tanuki.png" alt="썸네일" />
      </div>
      <div class="talk-content">
        <p class="talk-title">개발*****</p>
        <p class="info-comment">싸게 거래해주네요!!</p>
        <p class="info-date">2020.05.02</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style>
.myComment {
  margin-top: 0.5em;
  background-color: rgba(197, 197, 197, 0.061);
  border-radius: 10px;
  padding: 10px 10px;
}

.info-comment {
  padding: 5px 0;
}

.info-date {
  position: absolute;
  right: 30px;
}
</style>
