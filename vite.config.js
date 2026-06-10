import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import { VitePWA }
  from 'vite-plugin-pwa'

export default defineConfig({

  plugins: [

    react(),

    VitePWA({

      registerType:
        'autoUpdate',

      manifest: {

        name:
          'Vivero Estanislaoo',

        short_name:
          'Vivero',

        description:
          'Sistema de venta y administración de plantas',

        theme_color:
          '#2e7d32',

        background_color:
          '#ffffff',

        display:
          'standalone',

        icons: [

          {

            src:
              'pwa-192x192.png',

            sizes:
              '192x192',

            type:
              'image/png'

          },

          {

            src:
              'pwa-512x512.png',

            sizes:
              '512x512',

            type:
              'image/png'

          }

        ]

      }

    })

  ],

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