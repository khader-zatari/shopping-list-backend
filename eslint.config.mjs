import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		env: {
			es2021: true,
			node: true
		},
		plugins: ['@typescript-eslint', 'import', 'prettier'],
		rules: {
			'prettier/prettier': 'error',
			camelcase: 'error',
			'spaced-comment': 'error',
			quotes: ['error', 'single'],
			'no-duplicate-imports': 'error',
			'no-unused-vars': 'off',
			'no-magic-numbers': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/no-magic-numbers': 'error'
		},
		settings: {
			ignorePatterns: ['src/**/*.test.ts']
		}
	},
	pluginJs.configs.recommended,
	tseslint.configs.recommended
];
