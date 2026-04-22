import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-indent': [2, 4],
      'react/jsx-indent-props': [2, 4],
      indent: [2, 4],
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.tsx'] },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'warn',
      'react/function-component-definition': 'off',
      'no-shadow': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',

      'max-len': ['error', { ignoreComments: true, code: 150 }],
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks

      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies,

      'no-param-reassign': 'off',
      'no-undef': 'off',

      // крч видит аллах это надо включить
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',

      'react/jsx-max-props-per-line': [
        'warn',
        {
          maximum: 1, // Максимум пропсов в одну строку
          when: 'always', // Переносить всегда, если больше 1
        },
      ],
      semi: ['warn', 'always'],
      indent: 'off',
      'prefer-arrow-callback': 'off',
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',

      // "no-multi-spaces": "error",
      // "no-trailing-spaces": "error",
      // "indent": ["error", 2],
      // "space-in-parens": ["error", "never"],
      // "space-before-blocks": ["error", "always"],
      // "space-infix-ops": "error"
    },
  },
);
