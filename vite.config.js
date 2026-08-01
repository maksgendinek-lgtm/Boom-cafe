import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      /* Оптимизация WebP при сборке */
      webp: {
        quality: 85,
      },
      /* Отключаем PNG/JPG оптимизацию — может ломать существующие изображения */
      png: {
        enabled: false,
      },
      jpeg: {
        enabled: false,
      },
      jpg: {
        enabled: false,
      },
      /* Отключаем SVG — нет зависимости svgo */
      svg: {
        enabled: false,
      },
    }),
  ],
  base: '/Boom-cafe/',
  server: {
    host: true,
    allowedHosts: true,
  },
})
