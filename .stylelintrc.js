module.exports = {
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-recommended-vue',
    ],
    rules: {
        'selector-class-pattern': null,
        'at-rule-no-unknown': null,
        'function-no-unknown': null,
        'no-duplicate-selectors': true,
        'color-hex-length': 'long',
        'color-named': 'never',
        'selector-attribute-quotes': 'always',
        'function-url-quotes': 'always',
        'font-weight-notation': 'numeric',
        'font-family-name-quotes': 'always-unless-keyword',
        'comment-whitespace-inside': 'always',
        'rule-empty-line-before': 'always',
        'selector-pseudo-element-colon-notation': 'double',
    },
};
