module.exports = {
  env: {
      browser: true,
      es2021: true,
      es6: true
  },
  parser: 'babel-eslint',

  extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
      'no-console': 'off',
      'no-eval': 'error',
      'no-confusing-arrow': 'off',
      'arrow-body-style': 'off',
      'arrow-parens': 'off',
      // "arrow-spacing": "warn"
      // "react/jsx-max-props-per-line":"warn",
      'linebreak-style': 0,
      'import/no-extraneous-dependencies': 0,
      'class-methods-use-this': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-curly-spacing': [2, 'always'],
      'react/forbid-prop-types': 0,
      'react/require-default-pros': 0,
      'react/react-in-jsx-scope': 0,
      'react/jsx-indent': [2, 4],
      // "react/prop-types": [ 1 ],
      'comma-dangle': ['error', 'never'],
      indent: [1, 4],
      semi: 2,
      'import/order': 0,
      strict: 0,
      'space-in-parens': [0, 'always'],
      'react/prefer-es6-class': 1,
      quotes: [2, 'single'],
      'no-unused-vars': 0,
      'no-param-reassign': 0,
      'no-shadow': 0,
      'react/no-deprecated': 0,
      'import/no-unresolved': 0,
      'react/prop-types': 0,
      'no-alert': 0,
      'import/prefer-default-export': 0
  }
};
