module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["react-app", "react-app/jest", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};
