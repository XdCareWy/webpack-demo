const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackplugin({
			title: 'output Management'
		})
	]
};