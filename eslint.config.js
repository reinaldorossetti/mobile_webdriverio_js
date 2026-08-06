import globals from 'globals'
import js from '@eslint/js'

export default [
  {
    ignores: [
      'node_modules/**',
      'reports/**',
      'logs/**'
    ]
  },
  {
    files: ['config/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha,
        browser: 'readonly',
        driver: 'readonly',
        expect: 'readonly',
        $: 'readonly',
        $$: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }]
    }
  }
]
