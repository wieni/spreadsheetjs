var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		'spreadsheet': path.join('index.js')
	},
	output: {
		path: 'dist/',
		filename: "[name].min.js"
	},
	module : {
		loaders: [
			{
				test  : /\.jsx?$/,
				loader: 'babel',
				query : {
					presets: ['es2015']
				}
			}
		]
	},
	resolve: {
		root : [path.resolve('src')],
		alias: {
			sheet: path.resolve('src/sheet')
		},
		extensions: ['', '.js']
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({})
	]
};
