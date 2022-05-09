module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		node: true,
	},
	reportUnusedDisableDirectives: true,
	overrides: [
		{
			files: ['*.js'],
			// For now, require .js files (like .eslintrc.js) only to be formatted using Prettier.
			extends: ['plugin:prettier/recommended'],
			rules: {
				'prettier/prettier': 'warn',
			},
		},
		{
			files: ['*.ts'],
			parserOptions: {
				project: './tsconfig.json',
			},
			extends: [
				'eslint:recommended',
				'plugin:import/errors',
				'plugin:import/warnings',
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:prettier/recommended',
			],
			rules: {
				'prettier/prettier': 'warn',

				'@typescript-eslint/ban-types': [
					'error',
					{
						types: {
							// By default type `object` is banned because of https://github.com/microsoft/TypeScript/issues/21732.
							// This issue is not really affecting us and we use `object` heavily, therefore `object` is allowed.
							object: false,
						},
					},
				],
				'@typescript-eslint/explicit-function-return-type': 'error',
				'@typescript-eslint/explicit-member-accessibility': [
					'error',
					{
						accessibility: 'no-public',
					},
				],
				'@typescript-eslint/member-ordering': [
					'warn',
					{
						classes: ['field', 'constructor', 'method'],
					},
				],
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: ['class', 'interface', 'typeAlias', 'enumMember'],
						format: ['PascalCase'],
					},
				],
				'@typescript-eslint/no-misused-promises': [
					'error',
					{
						// Needed to work with async express request handlers
						checksVoidReturn: false,
					},
				],

				'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
				'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

				'accessor-pairs': 'error',
				'array-callback-return': 'error',
				curly: 'error',
				'default-case-last': 'error',
				'default-param-last': 'error',
				'dot-notation': 'error',
				eqeqeq: ['error', 'always', { null: 'never' }],
				'guard-for-in': 'error',
				'no-constructor-return': 'error',
				'no-else-return': 'error',
				'no-extra-bind': 'error',
				'no-lone-blocks': 'error',
				'no-new-wrappers': 'error',
				'no-nested-ternary': 'error',
				'no-restricted-globals': [
					'error',
					{ name: 'parseInt', message: `Use 'Number.parseInt()' instead.` },
					{ name: 'parseFloat', message: `Use 'Number.parseFloat()' instead.` },
				],
				'no-self-compare': 'error',
				'no-throw-literal': 'error',
				'no-useless-rename': 'error',
				'no-useless-return': 'error',
				'import/no-cycle': 'error',
				'import/order': [
					'warn',
					{
						'newlines-between': 'always',
						alphabetize: {
							order: 'asc',
							caseInsensitive: true,
						},
					},
				],
				'no-unreachable-loop': 'error',
				radix: 'error',
				'require-atomic-updates': 'error',
				'sort-imports': [
					'warn',
					{
						ignoreDeclarationSort: true,
					},
				],
				'spaced-comment': ['warn', 'always'],
			},
		},
		{
			// The configuration for all other ".ts" files also gets applied here. This is at least how we expect it to work.
			files: ['*.test.ts'],
			extends: ['plugin:jest/recommended', 'plugin:jest/style'],
		},
	],
};
