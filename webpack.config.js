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
		vendor: ['lodash', 'react', 'react-dom']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		port: 8989,
		stats: {
			color: true
		},
		inline: true,
		proxy: {
			"/api": {
				target: 'http://rapapi.org/mockjsdata/13981/',
			}
		}
	},
	module: {
		noParse: path.resolve(node_modules, '*/**/*.min.js'),
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
			template: './src/index.html',
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[hash].js',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new ExtractTextPlugin({
			filename: "main.css",
			allChunks: true
		}),
		new BundleAnalyzerPlugin()
	]
};