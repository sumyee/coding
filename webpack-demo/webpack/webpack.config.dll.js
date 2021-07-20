const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist', 'dll'),
    library: '[name]_dll', // 暴露给外部使用
    libraryTarget: 'umd', // libraryTarget 指定如何暴露内容，缺省时就是 var
  },
  plugins: [
    new webpack.DllPlugin({
      // name 和 library 一致
      name: '[name]_dll',
      // manifest.json 用于让 DLLReferencePlugin 映射到相关依赖上
      path: path.resolve(__dirname, '../dist', 'dll', 'manifest.json')
    })
  ]
}