module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['*.js', '*.test.ts', '*.spec.ts', '*.d.ts'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
  },
};
