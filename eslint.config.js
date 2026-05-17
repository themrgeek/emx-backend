import emxConfig from '@emx/eslint-config';

export default [
  ...emxConfig,
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/pnpm-lock.yaml',
    ],
  },
];
