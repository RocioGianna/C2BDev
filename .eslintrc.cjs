const RuleValue = { OFF: 0, WARN: 1, ERROR: 2 };

module.exports = {
    env: {
        "browser": true,
        "es2021": true,
    },
    settings: { react: { version: "detect" } },
    extends: [
        "eslint:recommended",
        "google",
        "plugin:react/recommended",
    ],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
    ],
    rules: {
        // ---- Layout and formatting ----
        "brace-style": [RuleValue.ERROR],
        "comma-dangle": [RuleValue.ERROR, "always-multiline"],
        "comma-spacing": [RuleValue.ERROR],
        "func-call-spacing": [RuleValue.ERROR],
        "indent": [RuleValue.ERROR, 4], // override Google style guide. Prev value: 2
        "keyword-spacing": [RuleValue.ERROR],
        "no-array-constructor": RuleValue.OFF,
        "no-extra-semi": RuleValue.OFF,
        "no-invalid-this": [RuleValue.ERROR],
        "no-redeclare": [RuleValue.ERROR],
        "no-throw-literal": [RuleValue.ERROR],
        "no-unused-vars": [RuleValue.ERROR, { args: "none", argsIgnorePattern: "^_" }],
        "object-curly-spacing": [RuleValue.ERROR, "always"], // override Google style guide. Prev value: default
        "quotes": [RuleValue.ERROR, "double", { "avoidEscape": true }], // override Google style guide. Prev value: single
        "semi": [RuleValue.ERROR],
        "space-before-blocks": [RuleValue.ERROR],
        "space-infix-ops": [RuleValue.ERROR],

        // -- Javascript --
        "arrow-spacing": RuleValue.ERROR,
        "block-spacing": [RuleValue.ERROR, "always"], // override Google style guide. Prev value: never
        "dot-location": [RuleValue.ERROR, "property"],
        "implicit-arrow-linebreak": RuleValue.ERROR,
        "max-len": RuleValue.OFF, // override Google style guide. Prev value: 80
        "multiline-ternary": [RuleValue.ERROR, "always-multiline"],
        "new-parens": RuleValue.ERROR,
        "no-whitespace-before-property": RuleValue.ERROR,
        "object-curly-newline": [RuleValue.ERROR, { multiline: true }], // override Google style guide. Prev value: default
        "operator-linebreak": [RuleValue.ERROR, "before"], // override Google style guide. Prev value: after
        "padded-blocks": RuleValue.OFF, // override Google style guide. Prev value: never
        "semi-style": RuleValue.ERROR,
        "space-in-parens": RuleValue.ERROR,
        "space-unary-ops": RuleValue.ERROR,
        "template-curly-spacing": RuleValue.ERROR,
        "wrap-regex": RuleValue.ERROR,

        // -- React --
        "react/prop-types": RuleValue.OFF,
        "react/jsx-boolean-value": [RuleValue.ERROR, "never"],
        "react/jsx-closing-bracket-location": [RuleValue.ERROR, "after-props"],
        "react/jsx-curly-newline": RuleValue.ERROR,
        "react/jsx-curly-spacing": RuleValue.ERROR,
        "react/jsx-equals-spacing": RuleValue.ERROR,
        "react/jsx-first-prop-new-line": [RuleValue.ERROR, "multiline"],
        "react/jsx-fragments": [RuleValue.ERROR, "syntax"],
        "react/jsx-max-props-per-line": [RuleValue.ERROR, { when: "multiline" }],
        "react/jsx-no-useless-fragment": [RuleValue.ERROR, { allowExpressions: true }],
        "react/jsx-props-no-multi-spaces": RuleValue.ERROR,
        "react/jsx-tag-spacing": RuleValue.ERROR,
        "react/jsx-wrap-multilines": RuleValue.ERROR,

        // ---- Deprecated ----
        "require-jsdoc": RuleValue.OFF,
        "valid-jsdoc": RuleValue.OFF,
    },

};
