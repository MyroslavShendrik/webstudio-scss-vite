import { defineConfig } from 'vite';
import glob from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/webstudio-scss-vite/',
  root: 'src', // src вже root
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('*.html', { ignore: ['node_modules/**'] }).reduce((entries, file) => {
        // Тільки ім'я файлу або шлях відносно root
        entries[file] = path.resolve(__dirname, 'src', file); // тут file відносно src
        return entries;
      }, {}),
    },
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
