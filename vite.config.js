import { defineConfig } from 'vite';
import glob from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

// Збираємо всі HTML файли у src
function getHtmlInputs() {
  const files = glob.sync('**/*.html', { cwd: 'src', nodir: true }); // тільки файли
  const entries = {};
  files.forEach(file => {
    // ключ — відносний шлях від root, значення — повний шлях
    entries[file] = path.resolve(__dirname, 'src', file);
  });
  return entries;
}

export default defineConfig({
  base: '/webstudio-scss-vite/',  // базовий шлях
  root: 'src',                     // відносний root
  build: {
    outDir: '../dist',             // збірка відносно root
    emptyOutDir: true,             // очищає dist перед збіркою
    rollupOptions: {
      input: getHtmlInputs(),      // автоматичний збір всіх HTML
    },
  },
  plugins: [
    injectHTML(), 
    FullReload(['./src/**/*.html']) // стабільний паттерн для всіх HTML
  ],
});
