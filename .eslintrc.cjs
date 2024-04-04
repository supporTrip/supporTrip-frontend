module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  'ignorePatterns': ['dist', '.eslintrc.cjs'],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'react-refresh',
    'prettier'
  ],
  'rules': {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    "prefer-arrow-callback": "error",
    "arrow-body-style": ["error", "always"],
    'prettier/prettier': ['error', {
      'endOfLine': 'auto'
    }],
  }
}