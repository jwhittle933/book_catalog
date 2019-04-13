module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  extends: ['plugin:vue/essential'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'arrow-spacing': 2,
    semi: [2, 'never'],
    camelcase: 2,
    'no-unused-vars': 1,
    'no-undef': 1,
    'no-console': 1,
    'eol-last': 1
  }
};
