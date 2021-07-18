const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    // 前端模拟数据
    before(app) {
      app.get('/api/user', (req, res) => {
        res.json({name: 'Oops ~'})
      })
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   }
    // }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
