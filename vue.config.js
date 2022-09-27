const path = require("path");
const autoprefixer = require("autoprefixer");
module.exports = {
  publicPath: "./",
  outputDir: "dist/remote-touping",   // 修改成对应的项目名
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // // 直接覆盖变量
            // 'tabs-nav-background-color': 'red',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）覆盖掉 vant 里面的组件变量
            hack: `true; @import "/src/assets/less/modifyVantVars.less";`,
          }
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
        ]
      }
    }
  },
  devServer: {
    open: true,
    https: true,
    proxy: {        // 根据实际项目做接口代理
      "/jscnCloud": {
        target: "http://192.168.1.188:8005",
        changeOrigin: true
      },
      "/shoudong": {
        target: "http://192.168.1.248/",
        changeOrigin: true
      },
      "/live": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
      "/rtc": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
      "/api": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
      "/json": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
    }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap',
    }
  },
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "src/assets/less/index.less")]
    });
}
