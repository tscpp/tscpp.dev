/** @type {import('@babel/core').TransformOptions} */
module.exports = {
	presets: [
		['@babel/preset-env', {
			useBuiltIns: false,
		}],
	],
	plugins: [
		'@babel/plugin-transform-runtime'
	]
}