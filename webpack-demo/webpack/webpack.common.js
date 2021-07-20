const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const Happypack = require('happypack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/main.js',
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    // noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.m?js$/,
        // exclude: /node_modules/,
        // use: 'babel-loader',
        include: path.resolve(__dirname, '../src'),
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024,
              outputPath: './img',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        // 第三方模块
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] // 不删除dll目录
    }),
    new HtmlWebpackPlugin({
      title: 'app-page',
      template: path.resolve(__dirname, '../src', 'public', 'index.html'),
      filename: 'app.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      title: 'index-page',
      template: path.resolve(__dirname, '../src', 'public', 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
    new OptimizeCssPlugin(),
    new webpack.BannerPlugin('Oops ~~~'),
    //忽略 moment 下的 ./locale 目录
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new Happypack({
      id: 'js', // 和rule中的id=js对应
      //将之前 rule 中的 loader 在此配置
      loaders: ['babel-loader'], //必须是数组
      // loaders: [
      //   {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //     },
      //   },
      // ],
    }),
    // dll
    // new webpack.DllReferencePlugin({
    //   // 打包前先检查这个文件 如果有就跳过打包直接动态链接，没有再重新打包
    //   manifest: path.resolve(__dirname, '../dist', 'dll', 'manifest.json')
    // })
    // new webpack.ProvidePlugin({
    //   $: ["jquery"]
    // })
  ],
};
