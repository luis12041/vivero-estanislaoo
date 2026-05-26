import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  IconButton
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

import AddIcon from '@mui/icons-material/Add'

import RemoveIcon from '@mui/icons-material/Remove'

import ClientLayout from '../layouts/ClientLayout'

import { useCart } from '../context/CartContext'

import { crearPedido } from '../services/pedidosService'

function Carrito() {

  const {

    carrito,

    eliminarDelCarrito,

    vaciarCarrito,

    aumentarCantidad,

    disminuirCantidad,

    total

  } = useCart()

  async function finalizarCompra() {

    try {

      await crearPedido(
        carrito,
        total
      )

      alert('Compra realizada 😎🌱')

      vaciarCarrito()

    } catch (error) {

      console.log(error)

      alert(
        'Debes iniciar sesión para comprar'
      )

    }

  }

  return (

    <ClientLayout>

      <Typography
        variant="h3"
        sx={{
          mb: 5,
          fontWeight: 700
        }}
      >

        Mi Carrito 🛒

      </Typography>

      {carrito.length === 0 ? (

        <Typography variant="h6">

          Tu carrito está vacío.

        </Typography>

      ) : (

        <>

          <Stack spacing={3}>

            {carrito.map((producto) => (

              <Card
                key={producto.nombre}
                sx={{
                  display: 'flex',
                  borderRadius: 5,
                  overflow: 'hidden'
                }}
              >

                <CardMedia
                  component="img"
                  image={producto.imagen}
                  alt={producto.nombre}
                  sx={{
                    width: 220
                  }}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >

                  <Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700
                      }}
                    >

                      {producto.nombre}

                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        color: 'text.secondary'
                      }}
                    >

                      ☀️ {producto.tipoLuz}

                    </Typography>

                    <Typography
                      sx={{
                        color: 'text.secondary'
                      }}
                    >

                      💧 {producto.riego}

                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        mt: 2,
                        fontWeight: 700
                      }}
                    >

                      ${producto.precio}

                    </Typography>

                    <Typography
                      sx={{
                        mt: 1
                      }}
                    >

                      Subtotal:
                      {' '}
                      <strong>

                        $
                        {producto.precio * producto.cantidad}

                      </strong>

                    </Typography>

                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 3,
                      flexWrap: 'wrap',
                      gap: 2
                    }}
                  >

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >

                      <IconButton
                        color="primary"
                        onClick={() =>
                          disminuirCantidad(
                            producto.nombre
                          )
                        }
                      >

                        <RemoveIcon />

                      </IconButton>

                      <Typography
                        variant="h6"
                      >

                        {producto.cantidad}

                      </Typography>

                      <IconButton
                        color="primary"
                        onClick={() =>
                          aumentarCantidad(
                            producto.nombre
                          )
                        }
                      >

                        <AddIcon />

                      </IconButton>

                    </Box>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        eliminarDelCarrito(
                          producto.nombre
                        )
                      }
                    >

                      Eliminar

                    </Button>

                  </Box>

                </CardContent>

              </Card>

            ))}

          </Stack>

          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3
            }}
          >

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700
              }}
            >

              Total: ${total}

            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2
              }}
            >

              <Button
                variant="contained"
                color="error"
                onClick={vaciarCarrito}
              >

                Vaciar carrito

              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={finalizarCompra}
              >

                Finalizar compra

              </Button>

            </Box>

          </Box>

        </>

      )}

    </ClientLayout>

  )
}

export default Carrito