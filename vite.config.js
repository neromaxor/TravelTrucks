import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: './postcss.config.js', // Якщо файл конфігурації знаходиться тут
  },
  plugins: [react()],
})
