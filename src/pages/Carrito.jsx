import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material'

import DeleteIcon
from '@mui/icons-material/Delete'

import AddIcon
from '@mui/icons-material/Add'

import RemoveIcon
from '@mui/icons-material/Remove'

import {
  useState
} from 'react'

import ClientLayout
from '../layouts/ClientLayout'

import {
  useCart
} from '../context/CartContext'

import {
  crearPedido
} from '../services/pedidosService'

function Carrito() {

  const {

    carrito,

    eliminarDelCarrito,

    vaciarCarrito,

    aumentarCantidad,

    disminuirCantidad,

    total

  } = useCart()

  const [open,
    setOpen] =
    useState(false)

  const [datosCliente,
    setDatosCliente] =
    useState({

      nombre: '',

      telefono: '',

      direccion: '',

      referencia: '',

      ubicacion: '',

      notas: ''

    })

  function handleChange(e) {

    setDatosCliente({

      ...datosCliente,

      [e.target.name]:
        e.target.value

    })

  }

  async function finalizarCompra() {

    try {

      await crearPedido(

        carrito,

        total,

        datosCliente

      )

      alert(
        'Pedido realizado 😎🌱'
      )

      vaciarCarrito()

      setOpen(false)

    } catch (error) {

      console.log(error)

      alert(
        'Debes iniciar sesión'
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

        <Typography
          variant="h6"
        >

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

                  flexDirection: {
                    xs: 'column',
                    md: 'row'
                  },

                  borderRadius: 5,

                  overflow: 'hidden'

                }}
              >

                <CardMedia
                  component="img"
                  image={producto.imagen}
                  alt={producto.nombre}
                  sx={{
                    width: {
                      xs: '100%',
                      md: 220
                    }
                  }}
                />

                <CardContent
                  sx={{
                    flex: 1
                  }}
                >

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
                      mt: 1
                    }}
                  >

                    ☀️ {producto.tipoLuz}

                  </Typography>

                  <Typography>

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
                      {producto.precio *
                        producto.cantidad}

                    </strong>

                  </Typography>

                  <Box
                    sx={{

                      display: 'flex',

                      justifyContent:
                        'space-between',

                      alignItems:
                        'center',

                      flexWrap: 'wrap',

                      gap: 2,

                      mt: 3

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
                      startIcon={
                        <DeleteIcon />
                      }
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

              justifyContent:
                'space-between',

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
                color="success"
                onClick={() =>
                  setOpen(true)
                }
              >

                Finalizar compra

              </Button>

            </Box>

          </Box>

          <Dialog
            open={open}
            onClose={() =>
              setOpen(false)
            }
            maxWidth="sm"
            fullWidth
          >

            <DialogTitle>

              Finalizar pedido 🌱

            </DialogTitle>

            <DialogContent>

              <Stack
                spacing={3}
                sx={{
                  mt: 2
                }}
              >

                <TextField
                  label="Nombre completo"
                  name="nombre"
                  fullWidth
                  onChange={handleChange}
                />

                <TextField
                  label="Teléfono"
                  name="telefono"
                  fullWidth
                  onChange={handleChange}
                />

                <TextField
                  label="Dirección"
                  name="direccion"
                  fullWidth
                  multiline
                  rows={2}
                  onChange={handleChange}
                />

                <TextField
                  label="Referencia"
                  name="referencia"
                  fullWidth
                  onChange={handleChange}
                />

                <TextField
                  label="Ubicación Google Maps"
                  name="ubicacion"
                  fullWidth
                  placeholder="https://maps.google.com/..."
                  onChange={handleChange}
                />

                <TextField
                  label="Notas"
                  name="notas"
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleChange}
                />

              </Stack>

            </DialogContent>

            <DialogActions>

              <Button
                onClick={() =>
                  setOpen(false)
                }
              >

                Cancelar

              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={
                  finalizarCompra
                }
              >

                Confirmar pedido

              </Button>

            </DialogActions>

          </Dialog>

        </>

      )}

    </ClientLayout>

  )

}

export default Carrito