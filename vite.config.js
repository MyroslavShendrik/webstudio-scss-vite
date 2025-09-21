import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  base: '/webstudio-scss-vite-1/',
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('./src/**/*.html').reduce((entries, file) => {
        const name = path.relative('src', file); // прибираємо "src/"
        entries[name] = file;
        return entries;
      }, {}),
    },
    outDir: '../dist',
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});