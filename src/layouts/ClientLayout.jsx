import {
  Box,
  Container,
  Typography
} from '@mui/material'

import Navbar
from '../components/Navbar'

function ClientLayout({
  children
}) {

  return (

    <Box
      sx={{

        minHeight: '100vh',

        backgroundColor:
          '#f8faf8',

        display: 'flex',

        flexDirection: 'column'

      }}
    >

      <Navbar />

      <Container
        maxWidth="xl"
        sx={{

          py: {
            xs: 3,
            md: 5
          },

          flex: 1

        }}
      >

        {children}

      </Container>

      <Box
        component="footer"
        sx={{

          borderTop:
            '1px solid #e0e0e0',

          py: 2,

          px: 3,

          backgroundColor:
            'white'

        }}
      >

        <Typography
          sx={{

            textAlign: 'center',

            color: '#777',

            fontSize: '14px'

          }}
        >

          © 2026
          Vivero Estanislaoo 🌱

        </Typography>

      </Box>

    </Box>

  )

}

export default ClientLayout