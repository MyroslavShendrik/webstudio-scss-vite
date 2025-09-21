import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  base: '/webstudio-scss-vite/',
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: glob.sync('**/*.html', { cwd: 'src' }).reduce((entries, file) => {
        // file відносно root
        entries[file] = path.resolve(__dirname, 'src', file);
        return entries;
      }, {}),
    },
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
