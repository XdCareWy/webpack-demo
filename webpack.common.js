const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const node_modules = path.resolve(__dirname, 'node_modules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: path.join('js/', '[name].[hash:8].js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    noParse: path.resolve(node_modules, '*/**/*.min.js'),
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules|vendor/
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#ff0000',
                'link-color': '#1DA57A',
                'border-radius-base': '0px'
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/',
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join('css/', '[name].[contenthash:8].css'),
      chunkFilename: path.join('css/', '[name].[contenthash:8].css')
    }),
    new HtmlWebpackPlugin({
      title: 'demo',
      template: './src/index.html',
      inject: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      // maxInitialRequests: Infinity,
      // minSize: 0,
      // minChunks: 1,
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称
      //     name(module, chunks, chcheGroupKey) {
      //       // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
      //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]; // 获取模块名称
      //       return `npm.${packageName.replace('@', '')}`; // 可选，一般情况下不需要将模块名称 @ 符号去除
      //     }
      //   }
      // }
    }
  }
};
