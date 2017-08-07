const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: '[name].bundle.js'
	},
	plugins: [
		new HtmlWebpackplugin({
			title: 'Code Splitting'
		}),
		new CleanWebpackplugin(['dist'])
	]
};