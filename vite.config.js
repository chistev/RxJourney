import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $stores: path.resolve('./src/stores')
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
