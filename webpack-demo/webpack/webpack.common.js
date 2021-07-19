const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // devtool: 'inline-source-map',
  entry: {
    app: './src/main.js',
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
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
        exclude: /node_modules/,
        use: 'babel-loader',
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
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
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
    new CleanWebpackPlugin(),
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
    // new webpack.ProvidePlugin({
    //   $: ["jquery"]
    // })
  ],
};
