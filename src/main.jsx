import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import {
  ThemeProvider,
  CssBaseline
} from '@mui/material'

import theme from './theme'

import '@fontsource/poppins'

import { CartProvider } from './context/CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <CartProvider>

        <App />

      </CartProvider>

    </ThemeProvider>

  </React.StrictMode>,
)