const path = require('path');
const webpack = require('webpack');
const HtmlWebpackplugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
		vendor: ['lodash']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'cheap-eval-source-map',
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
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader']
				})
			}
			// {
			// 	test: /\.js$/,
			// 	exclude: /(node_modules)/,
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: {
			// 			presets: ['env']
			// 		}
			// 	}
			// }
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
			minChunk: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new ExtractTextPlugin("main.css")
	]
};