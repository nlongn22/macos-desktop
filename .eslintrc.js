module.exports = {
    extends: ['@nuxt/eslint-config'],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1, 'maxBOF': 0 }],
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': 0,
    },
};
