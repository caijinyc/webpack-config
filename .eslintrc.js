module.exports = {
    extends: [
        'eslint-config-alloy/react',
        'eslint-config-alloy/typescript',
        'prettier'
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
        'prettier',
    ],
    rules: {
        'indent': ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        'prettier/prettier': "error",
    },
};
