const webpack = require('webpack');
const path = require('path');

const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const indexFile = path.resolve(__dirname, '../src/server/server.js');
const environment = require(path.resolve(__dirname, '../src/environments/environment.dev'));

module.exports = {
	mode: 'development',
	target: 'node',
	externals: [nodeExternals()],
	entry: {
		server: indexFile
	},
	output:  {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist/server')
	},
	node: {
	  __dirname: false,
	  __filename: false,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							[
								'import',
								{
									libraryName: 'antd',
									libraryDirectory: 'es',
									style: 'css'
								}
							],
							'@babel/plugin-syntax-dynamic-import',
							'dynamic-import-node', 
							'@loadable/babel-plugin'
						]
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false, sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				],
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{
					/* inline if smaller than 10 KB, otherwise load as a file */
					loader: 'url-loader',
					options: {
						limit: 10000
					}
				}]
			},
			{ 
				test: /\.(eot|svg|ttf|woff2?|otf)$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			_APIPUBBASE_: JSON.stringify(environment.api_pub),
			_APICREDBASE_: JSON.stringify(environment.api_cred),
			_AUTHBASE_: JSON.stringify(environment.auth)
		}),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
			chunksSortMode: 'none'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].style.css'
		}),
		new MinifyPlugin()
	]
}