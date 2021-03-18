const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

/** @return {import('webpack').Configuration} */
module.exports = (env) => {
	const production = env.production || env.development === false
	const development = !production
	const report = env.report
	const context = __dirname

	// Search for filename starting with 'icon.' in '/public', else 'public/icon.png'
	const logo = 'public/' + (fs.readdirSync(path.join(context, 'public'))
		.find(name => name.startsWith('icon.')) ?? 'icon.png')

	const plugins = [
		new HtmlWebpackPlugin({
			title: 'website',
			template: './public/index.html'
		}),
		new FaviconsWebpackPlugin({
			logo: logo,
			inject: true,
			mode: 'light'
		})
	]

	if (report || report === undefined && production) {
		plugins.push(new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: report !== undefined
		}))
	}

	return {
		entry: {
			app: './src/main.ts'
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						'babel-loader',
						'ts-loader'
					],
					exclude: /node_modules/
				},
				{
					test: /\.s[ac]ss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							// options: {
							// 	importLoaders: 1,
							// 	modules: true	
							// }
						},
						'sass-loader',
					]
				},
				{
					test: /\.html?$/,
					use: 'raw-loader'
				},
				{
					test: /\.(ttf|woff2?|png|jpe?g|svg|webp)$/,
					use: 'file-loader'
				}
			]
		},

		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			alias: {
				'@': path.join(__dirname, 'src')
			}
		},

		output: {
			filename: '[name].js',
			path: path.join(context, 'docs')
		},

		devServer: {
			contentBase: path.join(__dirname, 'docs'),
			port: 9000
		},

		plugins: plugins,

		context: context,
		mode: production ? 'production' : 'development',
		devtool: development ? 'source-map' : false
	}
}
