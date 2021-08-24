const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  css: {
    extract: true,
  },
  configureWebpack: {
    plugins: [new GenerateSW()]
  },
  pwa: {
    name: 'PaCE',
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCache: "yes",
    icons: [
      {
        src: "./img/icons/P-icon64x64.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        src: "./favicon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
    ],
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null
    }
  }
};
