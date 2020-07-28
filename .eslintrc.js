module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: "babel-eslint",
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "quotes": ["error", "double"],
    "linebreak-style": "off",
    "import/extensions": "off", // 取消對副檔名的驗證
    "no-underscore-dangle": ["error", { allow: ["_modules", "_children"] }], // 下底線規則
    "array-callback-return": ["error", { allowImplicit: true }], // map 要回傳一個值
    "no-nested-ternary": 0, // 可以使用三元運算
  },

  extends: [
    "plugin:vue/recommended",
    "@vue/airbnb"
  ],
};
