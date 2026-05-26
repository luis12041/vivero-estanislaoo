import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton
} from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'

import InstagramIcon from '@mui/icons-material/Instagram'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'

import Navbar from '../components/Navbar'

function ClientLayout({ children }) {

  return (

    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          flex: 1
        }}
      >

        {children}

      </Container>

      <Box
        component="footer"
        sx={{
          mt: 8,
          backgroundColor: '#1b5e20',
          color: 'white',
          py: 6,
          px: 3
        }}
      >

        <Container maxWidth="xl">

          <Stack
            direction={{
              xs: 'column',
              md: 'row'
            }}
            spacing={5}
            justifyContent="space-between"
            alignItems={{
              xs: 'flex-start',
              md: 'center'
            }}
          >

            <Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2
                }}
              >

                Vivero Estanislaoo 🌱

              </Typography>

              <Typography
                sx={{
                  maxWidth: 400,
                  lineHeight: 1.8,
                  opacity: 0.9
                }}
              >

                Plantas hermosas para
                llenar de vida tu hogar,
                jardín y espacios favoritos 🌿

              </Typography>

            </Box>

            <Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2
                }}
              >

                Contacto 📞

              </Typography>

              <Typography sx={{ mb: 1 }}>

                📍 Tejupilco, México

              </Typography>

              <Typography sx={{ mb: 1 }}>

                📱 722 000 0000

              </Typography>

              <Typography>

                ✉️ vivero@gmail.com

              </Typography>

            </Box>

            <Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2
                }}
              >

                Síguenos 🌿

              </Typography>

              <Stack
                direction="row"
                spacing={1}
              >

                <IconButton
                  sx={{
                    color: 'white'
                  }}
                >

                  <FacebookIcon />

                </IconButton>

                <IconButton
                  sx={{
                    color: 'white'
                  }}
                >

                  <InstagramIcon />

                </IconButton>

                <IconButton
                  sx={{
                    color: 'white'
                  }}
                >

                  <WhatsAppIcon />

                </IconButton>

              </Stack>

            </Box>

          </Stack>

          <Typography
            sx={{
              textAlign: 'center',
              mt: 5,
              opacity: 0.7
            }}
          >

            © 2026 Vivero Estanislaoo 🌱
            Todos los derechos reservados.

          </Typography>

        </Container>

      </Box>

    </Box>

  )
}

export default ClientLayout