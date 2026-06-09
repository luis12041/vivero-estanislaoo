import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material'

import CloseIcon
  from '@mui/icons-material/Close'

import {
  useState
} from 'react'

import { useCart } from '../context/CartContext'

function PlantCard({
  id,
  nombre,
  precio,
  imagen,
  tipoLuz,
  riego,
  disponible,
  descripcion,
  stock
}) {

  const { agregarAlCarrito } =
    useCart()

  const [openModal,
    setOpenModal] =
    useState(false)

  const producto = {

    id,

    nombre,

    precio,

    imagen,

    tipoLuz,

    riego,

    disponible,

    descripcion,

    stock

  }

  return (

    <>

      <Card
        sx={{

          borderRadius: 5,

          boxShadow:
            '0 10px 25px rgba(0,0,0,0.08)',

          transition: '0.3s',

          height: '100%',

          display: 'flex',

          flexDirection: 'column',

          overflow: 'hidden',

          '&:hover': {

            transform:
              'translateY(-8px)',

            boxShadow:
              '0 20px 40px rgba(0,0,0,0.12)'

          }

        }}
      >

        <CardMedia
          component="img"
          height="260"
          image={imagen}
          alt={nombre}
          sx={{
            objectFit: 'cover'
          }}
        />

        <CardContent
          sx={{

            flexGrow: 1,

            display: 'flex',

            flexDirection: 'column',

            justifyContent:
              'space-between'

          }}
        >

          <Box>

            <Typography
              variant="h5"
              sx={{

                fontWeight: 700,

                mb: 1

              }}
            >

              {nombre}

            </Typography>

            <Typography
              variant="h6"
              sx={{

                color: '#2e7d32',

                mb: 2,

                fontWeight: 700

              }}
            >

              ${precio}

            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{
                mb: 2
              }}
            >

              <Chip
                label={`☀️ ${tipoLuz}`}
                color="warning"
              />

              <Chip
                label={`💧 ${riego}`}
                color="info"
              />

            </Stack>

            <Typography
              sx={{
                mb: 1,
                fontWeight: 700
              }}
            >

              Stock disponible:
              {' '}
              {stock || 0}

            </Typography>

            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                color:
                  stock > 0
                    ? '#2e7d32'
                    : '#d32f2f'
              }}
            >

              {stock > 0
                ? 'Disponible'
                : 'Agotado'}

            </Typography>
          </Box>

          <Stack spacing={2}>

            <Button
              variant="outlined"
              fullWidth
              onClick={() =>
                setOpenModal(true)
              }
              sx={{
                borderRadius: 3
              }}
            >

              Ver detalles

            </Button>

            <Button
              variant="contained"
              fullWidth
              disabled={stock <= 0}
              onClick={() =>
                agregarAlCarrito(
                  producto
                )
              }
              sx={{
                borderRadius: 3
              }}
            >

              {stock > 0
                ? 'Agregar al carrito'
                : 'Agotado'}

            </Button>

          </Stack>

        </CardContent>

      </Card>

      <Dialog
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        maxWidth="md"
        fullWidth
      >

        <DialogContent
          sx={{
            p: 0
          }}
        >

          <Box
            sx={{

              position: 'absolute',

              top: 15,

              right: 15,

              zIndex: 10

            }}
          >

            <IconButton
              onClick={() =>
                setOpenModal(false)
              }
              sx={{

                backgroundColor:
                  'white',

                '&:hover': {

                  backgroundColor:
                    '#f5f5f5'

                }

              }}
            >

              <CloseIcon />

            </IconButton>

          </Box>

          <Box
            sx={{

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr'
              }

            }}
          >

            <Box
              component="img"
              src={imagen}
              alt={nombre}
              sx={{

                width: '100%',

                height: '100%',

                objectFit: 'cover',

                minHeight: 500

              }}
            />

            <Box
              sx={{
                p: 5
              }}
            >

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2
                }}
              >

                {nombre}

              </Typography>

              <Typography
                variant="h4"
                sx={{

                  color: '#2e7d32',

                  fontWeight: 700,

                  mb: 3

                }}
              >

                ${precio}

              </Typography>

              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                sx={{
                  mb: 3
                }}
              >

                <Chip
                  label={`☀️ ${tipoLuz}`}
                  color="warning"
                />

                <Chip
                  label={`💧 ${riego}`}
                  color="info"
                />

                <Chip
                  label={
                    stock > 0
                      ? 'Disponible'
                      : 'Agotado'
                  }
                  color={
                    stock > 0
                      ? 'success'
                      : 'error'
                  }
                />

              </Stack>

              <Typography
                sx={{

                  lineHeight: 1.9,

                  color: '#555',

                  mb: 4

                }}
              >

                {descripcion ||
                  'Hermosa planta ideal para decorar espacios interiores y exteriores 🌱'}

              </Typography>

              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={stock <= 0}
                onClick={() =>
                  agregarAlCarrito(
                    producto
                  )
                }
                sx={{

                  borderRadius: 3,

                  py: 1.5,

                  fontWeight: 700,

                  fontSize: '17px',

                  backgroundColor:
                    '#2e7d32'

                }}
              >

                {stock > 0
                  ? 'Agregar al carrito'
                  : 'Agotado'}

              </Button>

            </Box>

          </Box>

        </DialogContent>

      </Dialog>

    </>

  )

}

export default PlantCard