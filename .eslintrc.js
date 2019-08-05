module.exports = {
  extends: [
    'eslint-config-alloy/react',
    'eslint-config-alloy/typescript',
  ],
  env: {
    browser: true,
    es6: true,
  },
  globals: {},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    indent: ['error', 4],
    'comma-dangle': [
      'error', {
        objects: 'always-multiline',
      }],
  },
};
