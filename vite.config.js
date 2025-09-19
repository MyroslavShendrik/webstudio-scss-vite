import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  base: '/hw-js-vite/',
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('**/*.html').reduce((entries, file) => {
        // name без розширення або просто відносний шлях
        const name = path.relative('.', file);
        entries[name] = path.resolve(__dirname, 'src', file);
        return entries;
      }, {}),
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});