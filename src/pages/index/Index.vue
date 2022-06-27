<template>
  <div class="page">
    <div class="page-top">
      <div class="play-container"  v-show="isRemoting">
        <div class="area-info">{{ areaInfo }}</div>
        <CommonWebRtcPlayer
          v-if="playUrl && isRemoting"
          :playUrl="playUrl"
        ></CommonWebRtcPlayer>
      </div>
      <div class="close" @click="closeRemote" v-show="isRemoting">
        <img src="@/assets/images/close-remote.jpg" alt="" />
      </div>
      <div class="empty" v-if="!isRemoting">
        <img src="@/assets/images/empty.jpg" alt="" />
      </div>
    </div>

    <div class="page-bottom">
      <Area @handleClick="handleClick" />
    </div>
  </div>
</template>

<script>
import mqtt from "mqtt";
import CommonWebRtcPlayer from "@/components/common/CommonWebRtcPlayer.vue";
import Area from "@/components/Area";
// import CommonEasyPlayer from "@/components/common/CommonEasyPlayer.vue";

let hostname;
if (process.env.NODE_ENV == "development") {
  hostname = process.env.VUE_APP_SERVENAME;
} else {
  hostname = window.location.hostname;
}

export default {
  components: {
    CommonWebRtcPlayer,
    Area,
  },

  data() {
    return {
      client: undefined,
      clientId: undefined,
      isRemoting: false,
      sn: "",
      playUrl: "",
      areaList: [],
      areaInfo: ""
    };
  },

  mounted() {},

  methods: {
    initMqtt() {
      if (this.clientId) {
        this.addSubscribe();
        return;
      }

      this.clientId =
        "mqttjs_" +
        Math.random()
          .toString(16)
          .substr(2, 8);

      // const host = "ws://58.213.74.150:8083/mqtt";
      const host = `wss://${hostname}/mqtt`; // 系统工程师做了代理不加 8084 端口号
      // const host = "ws://broker.emqx.io:8083/mqtt";

      const options = {
        keepalive: 60,
        clientId: this.clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
      };

      // console.log("Connecting mqtt client");
      const client = mqtt.connect(host, options);

      client.on("error", (err) => {
        console.log("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        console.log("Reconnecting...");
      });

      // 连接
      client.on("connect", () => {
        console.log("Client connected:" + this.clientId);
        console.log(this.sn);
        // Subscribe 订阅
        client.subscribe(`remote/${this.sn}`, { qos: 0 });
      });

      // Received
      client.on("message", this.receiveMessage);
      this.client = client;
    },

    addSubscribe() {
      this.client.subscribe(`remote/${this.sn}`, { qos: 0 });
    },

    receiveMessage(topic, message) {
      console.log(topic, message.toString());
      console.log("++++");
      const resMsg = JSON.parse(message.toString());
      const { type, playUrl } = resMsg;
      if (topic == `remote/${this.sn}`) {
        if (type === "open") {
          this.isRemoting = true;
          this.playUrl = playUrl;
          this.upDateAreaInfo();
        } else if (type === "close") {
          this.isRemoting = false;
          this.playUrl = "";
        }
      }
    },

    closeRemote() {
      if (!this.isRemoting) {
        return;
      }
      const msgObj = {
        type: "close",
      };
      this.client.publish(`remote/${this.sn}`, JSON.stringify(msgObj));
      this.isRemoting = false;
      this.playUrl = "";
    },

    upDateAreaInfo() {
      console.log(this.areaList, this.sn)
      for (let i = 0; i < this.areaList.length; i++) {
        let parent = this.areaList[i];
        for ( let j = 0; j < parent.children.length; j++) {
          let area = parent.children[j];
          if (this.sn == area.SN) {
            this.areaInfo = parent.label + ">" + area.label;
          }
        }
      }
    },

    handleClick(SN, areaList) {
      if (SN) {
        this.sn = SN;
        this.initMqtt();
      } 
      if (areaList && this.areaList.length < 1) {
        this.areaList = areaList;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  box-sizing: border-box;
  position: relative;
  padding-top: 51px;
  width: 100%;
  height: 100%;
  // background: url("~@/assets/bg.png") no-repeat;
  // background-size: 100% 100%;
  overflow: hidden;

 /deep/ .page-top {
    width: 100%;

    .play-container {
      position: relative;
      margin: 0 auto;
      width: 1338px;
      height: 780px;

      .area-info {
        position: absolute;
        width: 100%;
        left: 16px;
        top: -42px;
        font-size: 26px;
      }
    }
    .close {
      position: absolute;
      right: 3%;
      top: 6%;
      width: 87px;
      height: 62px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .empty {
      margin: 0 auto;
      width: 1338px;
      height: 780px;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .page-bottom {
    width: 100%;
    padding: 0 266px;
    margin-top: 16px;
  }
}
</style>
