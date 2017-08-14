const path = require('path');
const webpack = require('webpack');
const HtmlWebpackplugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: {
		app: './src/index.js',
		vendor: ['lodash']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.less$/i,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader']
				})
			},
			{
				test: /\.(jpg|png|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules|vendor)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackplugin(['dist']),
		new HtmlWebpackplugin({
			title: 'webpack demo',
			template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[hash:8].js'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin({
			filename: "main.css",
			allChunks: true
		}),
		new BundleAnalyzerPlugin()
	]
};