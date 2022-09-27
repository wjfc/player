<template>
  <div class="webrtc-player-wrapper">
    <video
      class="webrtc-player"
      id="webrtc-player"
      ref="webRtcPlayer"
      controls
      autoplay
    ></video>
    <slot></slot>
  </div>
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

    //  this.$nextTick(() => {
    //    setTimeout(() => {
    //     this.fullPlay();
    //   }, 3000)

    //   setTimeout(() => {
    //     this.exitFullPlay();
    //   }, 6000)
    //  })
    },

    fullPlay() {
      document.getElementById("webrtc-player").requestFullscreen();
    },

    exitFullPlay() {
      document.getElementById("webrtc-player").exitFullscreen();
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
.webrtc-player-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .webrtc-player {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
