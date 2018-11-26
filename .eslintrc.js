// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: false,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'req', // for server request 
        'e', // for e.returnvalue
        'Vue', // for Vue
        'routes',
        '$axios',
      ]
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ["warn", { "vars": "local", "varsIgnorePattern": "^_", "args": "none"}],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-tabs': 'off',
    'comma-dangle': 'off',
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
  }
}
