import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],

  build: {

    sourcemap: false,

    chunkSizeWarningLimit: 1600,

    rollupOptions: {

      output: {

        manualChunks: undefined,

        entryFileNames:
          'assets/[name]-[hash].js',

        chunkFileNames:
          'assets/[name]-[hash].js',

        assetFileNames:
          'assets/[name]-[hash].[ext]'

      }

    }

  },

  server: {

    host: true,

    port: 5173

  }

})