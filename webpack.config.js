var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		'spreadsheet': 'index.js'
	},
	output: {
		path: 'dist/',
		filename: "[name].min.js"
	},
	module : {
		loaders: [
			{
				test  : /\.js$/,
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
		},
		extensions: ['', '.js']
	},
	plugins: [
		// new webpack.SourceMapDevToolPlugin({})
	]
};
