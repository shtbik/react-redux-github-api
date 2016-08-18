var path = require('path')
var webpack = require('webpack')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(nodeEnv)
		}
	}),

	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: 'vendor.bundle.js'
	})
]

if( isProd ) plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}))

module.exports = {

	name: 'js',
	passPerPreset: true,
	devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',

	entry: [
		// 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
		// 'webpack-hot-middleware/client',
		'./src/js/index.js',
		'./src/scss/index.scss'
	],

	vendor: [
		'classnames',
		'react',
		'react-dom',
		'react-redux',
		'react-router',
		'react-router-redux',
		'react-virtualized',
		'redux',
		'redux-form',
		'redux-thunk'
	],

	output: {
		path: path.join(__dirname, 'static/scripts'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	
	plugins: plugins,

	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			
			query: {presets: ['react', 'es2015', 'stage-0']},
			exclude: /node_modules/,
			include: __dirname
		}, {
			test: /\.less?$/,
			loaders: ['style', 'raw', 'less'],
			include: __dirname
		}, {
			test: /\.(css|scss)$/,
			loaders: ['style', 'raw', 'sass'],
			include: __dirname
		}, { 
			test: /\.json$/, 
			loader: 'json' 
		}]
	}
}