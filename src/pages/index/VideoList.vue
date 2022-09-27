<template>
  <div class="video-lists">
    <img src="@/assets/images/video/logo.png" alt="" class="logo" />
    <div class="player-test">
      <div class="player" v-for="(item, i) in videos" :key="i">
        <CommonWebRtcPlayer :playUrl="item.url">
          <div class="player-title">{{ item.title }}</div>
        </CommonWebRtcPlayer>
      </div>
    </div>
    <div class="citys">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="(item, i) in areaList"
          :key="item.id"
          @click.native="handleCityClick(i, item)"
        >
          <div class="city-item" :class="{ active: i === parentActive }">
            {{ item.title }}
          </div>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import CommonWebRtcPlayer from "@/components/common/CommonWebRtcPlayer.vue";
import { getCategory, getList } from "@/service/apis";

export default {
  components: {
    CommonWebRtcPlayer,
    Swiper,
    SwiperSlide,
  },

  directives: {
    swiper: directive,
  },

  data() {
    return {
      parentActive: 0,
      videos: [],
      areaList: [],
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 48,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
          draggable: true,
          dragSize: 780,
        },
      },
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },

  mounted() {
    this.getCategory();
  },

  methods: {
    async getCategory() {
      const { data } = await getCategory();
      const { data: { list } = {} } = data;
      this.areaList = list;
      this.handleCityClick(0, this.areaList[0]);
    },

    async getList(item) {
      let categoryId = item.id;
      const params = {
        categoryId,
      };
      const { data } = await getList(params);
      const { data: { list } = {} } = data;
      this.videos = list.map((v) => ({
        url: v.ext1,
        title: v.title,
      }));
    },

    handleCityClick(i, item) {
      this.parentActive = i;
      this.getList(item);
    },
  },
};
</script>

<style lang="less" scoped>
.video-lists {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/video/bg.png") no-repeat;
  background-size: 100% 100%;

  .logo {
    display: block;
    width: 100%;
    height: 142px;
  }

  .player-test {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 277px;
    width: 100%;
    height: 780px;

    .player {
      width: 662px;
      height: 370px;
      margin-bottom: 31px;
    }
  }

  /deep/ .citys {
    position: relative;
    padding: 0 266px;
    margin-top: 42px;

    .swiper-container {
      padding-bottom: 0px;
    }

    .swiper-slide {
      width: 206px !important;
      height: 68px !important;
    }

    .city-item {
      width: 206px;
      height: 68px;
      text-align: center;
      line-height: 68px;
      font-size: 36px;
      background-image: url("~@/assets/images/city.png");
      background-size: 100% 100%;
      color: rgba(255, 255, 255, 0.5);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &.live {
      }

      &.active {
        background-image: url("~@/assets/images/city-focus.png");
        color: rgba(255, 255, 255, 1);
      }
    }

    .swiper-scrollbar {
      height: 4px;
      bottom: -4px;
      background-color: rgba(3, 146, 212, 0.2);

      .swiper-scrollbar-drag {
        background-color: rgba(3, 146, 212, 1);
      }
    }
  }

  .player-title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 56px;
    padding: 0 32px;
    line-height: 56px;
    color: #fff;
    font-size: 24px;
    pointer-events: none;
    background: url("~@/assets/images/video/title.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
