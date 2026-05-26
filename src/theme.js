import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },

    secondary: {
      main: '#81c784',
    },

    background: {
      default: '#f5f5f5',
    },
  },

  typography: {
    fontFamily: 'Poppins, sans-serif',

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 600,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },
})

export default theme