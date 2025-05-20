// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path'; // Necesitas importar 'resolve' de 'path'

export default defineConfig({
  base: './', // Esto está bien para rutas relativas
  build: {
    rollupOptions: {
      input: {
        // Define aquí todos tus archivos HTML como puntos de entrada
        main: resolve(__dirname, 'index.html'),
        mainIngredients: resolve(__dirname, 'mainingredient.html'), // Asegúrate de que el nombre del archivo sea exacto (mainingredient.html o mainingredients.html)
        menus: resolve(__dirname, 'menus.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
    // Opcional: Para asegurar que los archivos se colocan en la raíz de 'dist'
    // Si tienes carpetas para tus páginas, ajústalo. Por defecto, es 'dist'.
    // outDir: 'dist', 
  },
});