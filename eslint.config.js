import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            prettier: prettierPlugin,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'prettier/prettier': 'warn',
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {argsIgnorePattern: '^_'},
            ],
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        // одна группа для всех импортов — без пустых строк между ними
                        ['^'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'warn',
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    // Prettier override (disables conflicting rules)
    {
        ...prettierConfig,
    },
]);
