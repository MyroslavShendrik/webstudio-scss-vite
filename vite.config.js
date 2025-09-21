import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  base: '/webstudio-scss-vite/',
  root: path.resolve(__dirname, 'src'), // повний шлях root
  build: {
    outDir: path.resolve(__dirname, 'dist'), // повний шлях для збірки
    rollupOptions: {
      input: glob.sync('**/*.html', { cwd: path.resolve(__dirname, 'src'), absolute: true }).reduce((entries, file) => {
        const name = path.relative(path.resolve(__dirname, 'src'), file);
        entries[name] = file;
        return entries;
      }, {}),
    },
  },
  plugins: [injectHTML(), FullReload([path.resolve(__dirname, 'src/**/*.html')])],
});
