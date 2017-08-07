const path = require('path');
const webpack = require('webpack');
const HtmlWebpackplugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
		another: './src/another-module.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackplugin({
			title: 'output Management'
		}),
		new CleanWebpackplugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		})
	]
};