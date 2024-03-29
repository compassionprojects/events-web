// With the help of the following post
// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxBracketSameLine: true,
        endOfLine: 'auto',
        printWidth: 80,
        tabWidth: 2,
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    // 'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
