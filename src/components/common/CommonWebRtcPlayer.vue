<template>
  <video id="webrtc-player" ref="webRtcPlayer" controls></video>
</template>

<script>
export default {
  props: {
    playUrl: {
      type: String,
      default: "",
    },
  },

  data() {
    return {};
  },

  watch: {
    playUrl: {
      handler: function(newv) {
        this.$nextTick(() => {
          newv && this.initPlayer();
        });
      },
      immediate: true,
    },
  },

  mounted() {},

  methods: {
    initPlayer() {
      const options = {
        video: this.$refs.webRtcPlayer,
        autoplay: true,
        onPlay: this.onPlay,
        onPause: this.onPause,
      };

      this.player = new window.JSWebrtc.Player(this.playUrl, options);
    },

    onPlay() {
      console.log("播放");
    },

    onPause() {
      console.log("暂停");
    },
  },
};
</script>

<style scoped lang="less">
#webrtc-player {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
