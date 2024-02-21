import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { checker } from 'vite-plugin-checker';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteTsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      exclude: [
        './node_modules/',
        './.eslintrc.cjs',
        './src/store/',
        './src/main.tsx',
        './src/App.tsx',
      ],
    },
    mockReset: true,
  },
});
