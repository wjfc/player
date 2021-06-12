<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setWechatInfo } from "@/utils/localStorage";
import { getUrlParam } from "@/utils/utils";

export default {
  data() {
    return {};
  },

  created() {
    this.initWeiXinJSSDK();
    this.storeWechatInfo();
  },

  methods: {
    // 存储微信用户信息
    storeWechatInfo() {
      const headimgurl =
        getUrlParam("headimgurl") ||
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Ic8RUpPQplJRrMJ2bbfKK64XgjhjC3hlJyvED2nHtGibJTs9323F6tg7QjMyian8ibIgAbU1iawGUswM5mhuT56v6A/132";
      const nickname = getUrlParam("nickname") || "谢衣之徒";
      const openid = getUrlParam("openid") || "ozq9nwYWj8vQ3Gj3abjAh3myDnrI1";

      const params = {
        headimgurl,
        nickname: decodeURI(nickname),
        openid,
      };
      setWechatInfo(params);
    },

    // 初始化微信 js sdk
    initWeiXinJSSDK() {},
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f9f9f9;
}
</style>
