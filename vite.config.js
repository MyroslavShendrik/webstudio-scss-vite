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
      input: glob.sync('./src/**/*.html').reduce((entries, file) => {
        const name = path.parse(file).name; // тільки ім’я файлу без шляху
        entries[name] = file;
        return entries;
      }, {}),
    },
    outDir: '../dist', // збірка піде в dist на рівні з src
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
  ],
});
