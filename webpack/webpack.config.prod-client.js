const webpack = require('webpack');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const indexFile = path.resolve(__dirname, '../src/client/start.js');
const environment = require(path.resolve(__dirname, '../src/environments/environment.prod'));

module.exports = (env) => {

	return {
		mode: 'production',
		entry: {
			client: indexFile
		},
		output:  {
			filename: '[name].bundle.js',
			chunkFilename: '[name].bundle.js',
			path: path.resolve(__dirname, '../dist/client'),
			publicPath: '/static/'
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
					test: /\.(jpe?g|png|gif|webp)$/,
					use: [{
						/* inline if smaller than 10 KB, otherwise load as a file */
						loader: 'url-loader',
						options: {
							limit: 10000
						}
					}]
				},
				{ 
					test: /\.(eot|svg|ttf|woff2?|otf|webp)$/,
					use: 'file-loader'
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				_APIPUBBASE_: JSON.stringify(environment.api_pub),
				_APICREDBASE_: JSON.stringify(environment.api_cred),
				_AUTHBASE_: JSON.stringify(environment.auth),
				'process.env.SSR': env.SSR
			}),
			// new HtmlWebPackPlugin({
			// 	template: './src/index.html',
			// 	filename: './index.html',
			// 	chunksSortMode: 'none'
			// }),
			new MiniCssExtractPlugin({
				filename: '[name].style.css'
			}),
			new MinifyPlugin(),
			new CompressionPlugin({
				test: /\.(js|css)(\?.*)?$/i
			}),
			new LoadablePlugin()
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors'
					}
				},
			}
		}
	};
};
