const js = require("@eslint/js");
const eslintConfigNext = require("eslint-config-next");

module.exports = [
  js.configs.recommended,
  ...eslintConfigNext.flat(),
  {
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
  },
];