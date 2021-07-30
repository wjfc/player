<template>
  <div class="module-wrap">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  }
}
</script>

<style lang="less" scoped>
.module-wrap {
  padding: 21px 14px;

  .title {
    color: #F2F2F2;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>