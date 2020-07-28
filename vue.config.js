const ThemeColorReplacer = require("webpack-theme-color-replacer");
const forElementUI = require("webpack-theme-color-replacer/forElementUI");

module.exports = {
  publicPath: "./",
  outputDir: "./dist",
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins: [
      new ThemeColorReplacer({
        matchColors: [
          ...forElementUI.getElementUISeries("#409EFF"), // element-ui主色系列
        ],
        changeSelector: forElementUI.changeSelector,
      }),
    ],
  },
  lintOnSave: process.env.NODE_ENV !== "production",
};
