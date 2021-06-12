<template>
  <div class="loading-box" v-if="isShow">
    <p>
      <van-loading type="spinner" color="#c9c9c9" />
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  components: {},

  data() {
    return { isShow: false };
  },

  created() {},

  mounted() {
    this.show();
  },

  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
      // 清除自己
      this.remove();
    }
  }
};
</script>

<style lang='less' scoped>
.loading-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 20px;
  z-index: 9999;

  p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>