import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { checker } from 'vite-plugin-checker';

export default defineConfig({
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
      exclude: ['./node_modules/'],
    },
    mockReset: true,
  },
});
