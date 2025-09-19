import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  base: '/webstudio-scss-vite/',
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('**/*.html', { ignore: ['node_modules/**'] }).reduce((entries, file) => {
        entries[file] = path.resolve(__dirname, 'src', file);
        return entries;
      }, {}),
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
