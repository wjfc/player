const path = require("path");
const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");
module.exports = {
  publicPath: "./",
  outputDir: "dist/vue-project-template",   // 修改成对应的项目名
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
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    proxy: {        // 根据实际项目做接口代理
      "/volunteers": {
        target: "http://112.74.114.37:8023/",
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
