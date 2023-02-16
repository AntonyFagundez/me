/** @type {import("eslint").ESLint.Options} */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "import", "@typescript-eslint"],
  rules: {
    "import/order": ["warn", { "newlines-between": "always" }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "warn",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        traillingComma: "all",
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        bracketSpacing: true,
        arrowParens: "always",
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": [
      "warn",
      {
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "no-debugger": "warn",
  },
  ignorePatterns: [
    "node_modules",
    "storybook-static",
    "dist",
    ".next",
    "coverage",
    "build",
    "public",
    "__snapshots__",
  ],
};
