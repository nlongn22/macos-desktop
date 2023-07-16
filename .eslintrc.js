module.exports = {
    extends: [
        '@nuxt/eslint-config',
        'plugin:vue-scoped-css/vue3-recommended',
    ],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1, 'maxBOF': 0 }],
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': 0,
        'vue-scoped-css/v-deep-pseudo-style': ['error', ':deep'],
    },
};
