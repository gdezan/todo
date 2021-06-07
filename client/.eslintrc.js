module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  rules: {
    // Include .prettierrc.js rules
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    // We don't want unused vars
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
  },
};
