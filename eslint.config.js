import globals from "globals";
import eslint from "typescript-eslint";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  ...eslint.configs.recommended,
  {
    plugins: {
      prettier: prettier,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        globals: {
          ...globals.es5,
          ...globals.node,
          myCustomGlobal: "readonly",
        },
      },
    },
    rules: {
      "no-console": "off",
      "prettier/prettier": ["error"],
    },
    ignores: ["/*.js’", "dist", "node_modules"],
  },
];
