// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['vue'],
  rules: {
    'max-len': [
      'error',
      {
        code: 250,
      },
    ],
    'no-unused-vars': 'off',
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
