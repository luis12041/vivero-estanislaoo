import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack
} from '@mui/material'

import SpaIcon from '@mui/icons-material/Spa'

import WaterDropIcon from '@mui/icons-material/WaterDrop'

import WbSunnyIcon from '@mui/icons-material/WbSunny'

import {
  Link
} from 'react-router-dom'

import ClientLayout from '../layouts/ClientLayout'

function Home() {

  const beneficios = [

    {
      titulo: 'Plantas saludables',
      descripcion:
        'Todas nuestras plantas reciben cuidados especiales.',
      icono: <SpaIcon sx={{ fontSize: 50 }} />
    },

    {
      titulo: 'Riego ideal',
      descripcion:
        'Te ayudamos a elegir el mejor tipo de riego.',
      icono: <WaterDropIcon sx={{ fontSize: 50 }} />
    },

    {
      titulo: 'Sol o sombra',
      descripcion:
        'Encuentra plantas perfectas para cualquier espacio.',
      icono: <WbSunnyIcon sx={{ fontSize: 50 }} />
    }

  ]

  return (

    <ClientLayout>

      <Box
        sx={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
          py: 10,
          background:
            'linear-gradient(to right, #e8f5e9, #f1f8e9)',
          borderRadius: 6,
          mb: 10
        }}
      >

        <Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: '#2e7d32',
              fontSize: {
                xs: '2.5rem',
                md: '4rem'
              }
            }}
          >

            Bienvenido a
            {' '}
            Vivero Estanislaoo 🌱

          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 5,
              color: '#555',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.7
            }}
          >

            Descubre plantas increíbles
            para decorar, cuidar y llenar
            de vida tu hogar 🌿

          </Typography>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={3}
            justifyContent="center"
          >

            <Button
              component={Link}
              to="/catalogo"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 4
              }}
            >

              Ver catálogo

            </Button>

            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 4
              }}
            >

              Crear cuenta

            </Button>

          </Stack>

        </Box>

      </Box>

      <Box sx={{ mb: 10 }}>

        <Typography
          variant="h3"
          sx={{
            mb: 6,
            textAlign: 'center',
            fontWeight: 700
          }}
        >

          ¿Por qué elegirnos? 🌿

        </Typography>

        <Grid
          container
          spacing={4}
        >

          {beneficios.map((item, index) => (

            <Grid
              item
              xs={12}
              md={4}
              key={index}
            >

              <Card
                sx={{
                  borderRadius: 5,
                  textAlign: 'center',
                  height: '100%',
                  boxShadow: 4,
                  p: 2
                }}
              >

                <CardContent>

                  <Box
                    sx={{
                      color: '#2e7d32',
                      mb: 3
                    }}
                  >

                    {item.icono}

                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2
                    }}
                  >

                    {item.titulo}

                  </Typography>

                  <Typography
                    sx={{
                      color: '#666',
                      lineHeight: 1.7
                    }}
                  >

                    {item.descripcion}

                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

      <Box sx={{ mb: 10 }}>

        <Typography
          variant="h3"
          sx={{
            mb: 6,
            textAlign: 'center',
            fontWeight: 700
          }}
        >

          Plantas destacadas 🌱

        </Typography>

        <Grid
          container
          spacing={4}
        >

          {[
            {
              nombre: 'Monstera',
              imagen:
                'https://images.unsplash.com/photo-1545241047-6083a3684587'
            },
            {
              nombre: 'Suculenta',
              imagen:
                'https://images.unsplash.com/photo-1459156212016-c812468e2115'
            },
            {
              nombre: 'Lavanda',
              imagen:
                'https://images.unsplash.com/photo-1501004318641-b39e6451bec6'
            }

          ].map((planta, index) => (

            <Grid
              item
              xs={12}
              md={4}
              key={index}
            >

              <Card
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  boxShadow: 4
                }}
              >

                <CardMedia
                  component="img"
                  height="300"
                  image={planta.imagen}
                  alt={planta.nombre}
                />

                <CardContent>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700
                    }}
                  >

                    {planta.nombre}

                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </ClientLayout>

  )
}

export default Home