const webpack = require('webpack');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const indexFile = path.resolve(__dirname, '../src/client/start.js');
const environment = require(path.resolve(__dirname, '../src/environments/environment.dev'));

module.exports = (env) => {

	return{
		mode: 'development',
		entry: {
			app: indexFile
		},
		devtool: 'inline-source-map',
		devServer: {
			disableHostCheck: true,
			host: '0.0.0.0',
			port: 9000,
			open: true,
			historyApiFallback: true
		},
		output:  {
			filename: 'client.bundle.js',
			publicPath: '/'
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
								'@babel/plugin-syntax-dynamic-import'
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
					test: /\.css$/,
					use: [
						'style-loader',
						{loader: 'css-loader', options: { importLoaders: 1 }},
						'postcss-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						{loader: 'css-loader', options: { importLoaders: 1 }},
						'postcss-loader',
						'sass-loader'
					]
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
				_AUTHBASE_: JSON.stringify(environment.auth),
				'process.env.SSR': env.SSR
			}),
			new HtmlWebPackPlugin({
				template: './src/index.html',
				filename: './index.html'
			})
		],
		watchOptions: {
			poll: true,
			ignored: /node_modules/
		}
	};
}