// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
   {
      ignores: ['**/*.cjs', '**/*.js'],
   },

   eslint.configs.recommended,

   ...tseslint.configs.strictTypeChecked,
   ...tseslint.configs.stylisticTypeChecked,

   {
      languageOptions: {
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
      },
      rules: {
         'comma-dangle': 'off',
         '@typescript-eslint/no-extraneous-class': 'off',
      },
   },

   perfectionist.configs['recommended-natural'],
   {
      rules: {
         'perfectionist/sort-objects': 'off',
         'perfectionist/sort-classes': 'off',
      },
   },

   {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      ...jest.configs['flat/recommended'],
      rules: {
         ...jest.configs['flat/recommended'].rules,
         '@typescript-eslint/unbound-method': 'off',
         '@typescript-eslint/no-unsafe-member-access': 'off',
         '@typescript-eslint/no-unsafe-call': 'off',
      },
   },
];
