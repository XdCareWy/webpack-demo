const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    port: 8889,
    stats: {
      color: true,
    },
    inline: true,
    proxy: {
      '/api': {
        target: 'http://rapapi.org/mockjsdata/13981/',
      },
    },
  },
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin(), new BundleAnalyzerPlugin()],
});
