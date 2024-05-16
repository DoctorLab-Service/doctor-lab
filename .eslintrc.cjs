module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true, 
    },
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:@next/next/recommended',
      ],
      parser: '@typescript-eslint/parser',
      ignorePatterns: ['dist', '.eslintrc.cjs'],
      parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: './tsconfig.json',
            tsconfigRootDir: __dirname,
      },
      plugins: [
            '@typescript-eslint',
            'react-hooks',
            'import',
            'react',
            'i18next',
            'prettier',
      ],
      rules: {
      // General rules
      eqeqeq: 'warn',
      'no-var': 'error',
      'no-eval': 'error',
      'prefer-const': 'warn',
      'no-undef-init': 'warn',
      'no-duplicate-imports': 'warn',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': ['warn', { checkFragmentShorthand: false }],
      'react/no-unescaped-entities': ['warn', { forbid: ['>', '}', "'"] }],
      'react/no-deprecated': 'warn',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/self-closing-comp': ['error', { component: false, html: true }],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/array-type': 'error',
      
      // Additional rules
      indent: ['error', 4],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      
      // Import rules
      'import/order': [
          'error',
          {
              groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
              pathGroups: [
                  {
                      pattern: '**/**',
                      group: 'parent',
                      position: 'before',
                  },
              ],
              alphabetize: { order: 'asc' },
          },
      ],
      'prettier/prettier': [
          'warn',
          {
              endOfLine: 'auto',
          },
      ],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
};
