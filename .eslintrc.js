module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': 'off', // 取消對副檔名的驗證
    'no-underscore-dangle': ['error', { allow: ['_modules', '_children'] }], // 下底線規則
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
};
