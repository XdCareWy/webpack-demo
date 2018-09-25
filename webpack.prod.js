const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist'])]
});
