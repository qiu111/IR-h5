import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/InvestorRelationsPortal-h5/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'IP',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ifzq': {
        target: 'IP',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ifzq/, ''),
      },
    },
    hmr: {
      overlay: false
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router'],
          'vendor-vant': ['vant'],
          'vendor-echarts': ['echarts'],
        }
      }
    }
  }
})
