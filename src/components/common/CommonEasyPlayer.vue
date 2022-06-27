<template>
  <EasyPlayer v-bind="{ ...playerOptions }"></EasyPlayer>
</template>

<script>
import EasyPlayer from "@easydarwin/easyplayer";

export default {
  components: {
    EasyPlayer,
  },

  data() {
    return {
      playerOptions: {
        // "video-url": "http://demo.easynvr.com:10800/flv/live/stream_9.flv",
        // "video-url": "http://192.168.1.158:8090/live/1.flv",
        "video-url": "webrtc://jszhgdxc.baron.com.cn/live/SN000001",
        "video-title": "test",
      },
    };
  },
};
</script>

<style></style>
