import { defineConfig } from 'vite';
import glob from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

// Функція для автоматичного збору всіх HTML файлів у src
function getHtmlInputs() {
  const files = glob.sync('**/*.html', { cwd: 'src', nodir: true }); // тільки файли
  const entries = {};
  files.forEach(file => {
    entries[file] = path.resolve(__dirname, 'src', file); // повний шлях для Rollup
  });
  return entries;
}

export default defineConfig({
  base: '/webstudio-scss-vite/',    // базовий шлях для продакшн
  root: 'src',                       // відносний root
  build: {
    outDir: '../dist',               // збірка відносно root
    emptyOutDir: true,               // очищає dist перед збіркою
    rollupOptions: {
      input: getHtmlInputs(),        // автоматичний збір всіх HTML
    },
  },
  plugins: [
    injectHTML(),                    // інжект HTML
    FullReload(['src/**/*.html']),   // гаряче оновлення HTML
  ],
});
