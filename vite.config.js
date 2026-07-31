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
      /* Оптимизация PNG/JPG на случай появления в будущем */
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      /* Отключаем SVG — нет зависимости svgo */
      svg: {
        enabled: false,
      },
    }),
  ],
  server: {
    host: true,
    allowedHosts: true,
  },
})