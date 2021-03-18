/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		indent: [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		]
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended'
			],
			rules: {
				semi: [
					'error',
					'never'
				],
				'@typescript-eslint/semi': [
					'error',
					'never'
				],
				'@typescript-eslint/member-delimiter-style': [
					'error',
					{
						multiline: {
							delimiter: 'none'
						},
						singleline: {
							delimiter: 'comma',
							requireLast: false
						}
					}
				]
			}
		},
		{
			files: '*.d.ts',
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/ban-types': 'off'
			}
		}
	],
	ignorePatterns: [
		'dist'
	]
}