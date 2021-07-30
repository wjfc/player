const path = require("path");
const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");
module.exports = {
  publicPath: "./",
  outputDir: "dist/wmsj-cloud-pc", 
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
          }
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 1920,
            unitToConvert: 'PX',
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    proxy: {        // 根据实际项目做接口代理
      "/wenming": {
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
