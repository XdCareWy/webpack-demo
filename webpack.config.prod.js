const path = require('path');
const webpack = require('webpack');
const HtmlWebpackplugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');

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
				use: ['style-loader', 'css-loader']
			},
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
			template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[hash:8].js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};