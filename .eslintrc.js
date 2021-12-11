module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  rules: {
    // ...
    'react-native/no-inline-styles': 0,
    'no-alert': 'off',
    'no-lone-blocks': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    //'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
