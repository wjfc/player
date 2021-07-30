<template>
  <div class="container">
    <div class="header">
      <div class="title">文明安宁云平台大数据中心</div>
      <img class="cursor" src="@/assets/images/logo_focus.png" />
      <div class="time">已正常运行30天</div>
    </div>
    <div class="content"
    ></div>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
.container {

  .header {
    position: relative;
    // height: 100px;
    height: 8vh;
    color: white;
    font-weight: bold;
    .bg("@{img}/logo_bg.png");

    .title {
      padding-top: 10px;
      font-size: 40px;
      text-align: center;
    }

    .time {
      position: absolute;
      right: 43px;
      bottom: 23px;
      font-size: 20px;
    }

    .cursor {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-25%);
      width: 330px;
      // height: 100px;
      height: 18.4vh;
    }
  }
}
</style>
