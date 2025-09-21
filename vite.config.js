import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  base: '/webstudio-scss-vite/',
  root: 'src', // відносний root
  build: {
    outDir: '../dist', // відносно root
    rollupOptions: {
      input: glob.sync('**/*.html', { cwd: 'src' }).reduce((entries, file) => {
        entries[file] = path.resolve(__dirname, 'src', file); // повний шлях для Rollup
        return entries;
      }, {}),
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['src/**/*.html'])
  ],
});
