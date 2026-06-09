import {
  Box,
  Typography,
  Card,
  Stack,
  Divider,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  Avatar
} from '@mui/material'

import jsPDF
  from 'jspdf'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  onSnapshot
} from 'firebase/firestore'

import {
  auth,
  db
} from '../firebase/config'

import ClientLayout
  from '../layouts/ClientLayout'

import PendingIcon
  from '@mui/icons-material/Pending'

import Inventory2Icon
  from '@mui/icons-material/Inventory2'

import LocalShippingIcon
  from '@mui/icons-material/LocalShipping'

import DoneAllIcon
  from '@mui/icons-material/DoneAll'

import PaymentsIcon
  from '@mui/icons-material/Payments'

function MisPedidos() {

  const [pedidos,
    setPedidos] =
    useState([])

  useEffect(() => {

    const usuario =
      auth.currentUser

    if (!usuario) return

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          'pedidos'
        ),

        (snapshot) => {

          const data =
            snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data()
              }))
              .filter(
                (pedido) =>
                  pedido.usuario ===
                  usuario.email
              )

          setPedidos(data)

        }

      )

    return () => unsubscribe()

  }, [])

  function obtenerPaso(
    estado
  ) {

    switch (estado) {

      case 'Pendiente':
        return 0

      case 'En proceso':
        return 1

      case 'En camino':
        return 2

      case 'Entregado':
        return 3

      default:
        return 0

    }

  }

  function obtenerMensaje(
    estado
  ) {

    switch (estado) {

      case 'Pendiente':
        return 'Estamos preparando tu pedido'

      case 'En proceso':
        return 'Tu pedido ya está siendo preparado'

      case 'En camino':
        return 'Tu pedido va en camino 🚚'

      case 'Entregado':
        return 'Pedido entregado exitosamente'

      default:
        return 'Pedido registrado'

    }

  }

  function obtenerColor(
    estado
  ) {

    switch (estado) {

      case 'Pendiente':
        return 'warning'

      case 'En proceso':
        return 'secondary'

      case 'En camino':
        return 'info'

      case 'Entregado':
        return 'success'

      default:
        return 'warning'

    }

  }

  const pasos = [

    'Pendiente',

    'En proceso',

    'En camino',

    'Entregado'

  ]

  function descargarTicket(
    pedido
  ) {

    const pdf =
      new jsPDF()

    pdf.setFontSize(18)

    pdf.text(
      'Vivero Estanislaoo',
      20,
      20
    )

    pdf.setFontSize(12)

    pdf.text(
      `Cliente: ${pedido.nombre}`,
      20,
      35
    )

    pdf.text(
      `Telefono: ${pedido.telefono}`,
      20,
      45
    )

    pdf.text(
      `Estado: ${pedido.estado}`,
      20,
      55
    )

    pdf.text(
      `Total: $${pedido.total}`,
      20,
      65
    )

    let y = 85

    pdf.text(
      'Productos:',
      20,
      y
    )

    y += 10

    pedido.productos.forEach(
      (producto) => {

        pdf.text(
          `${producto.nombre} x${producto.cantidad}`,
          25,
          y
        )

        y += 10

      }
    )

    pdf.save(
      `Ticket-${pedido.folio || pedido.id}.pdf`
    )

  }

  return (

    <ClientLayout>

      <Box
        sx={{
          mb: 4
        }}
      >

        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 40
            },

            fontWeight: 900
          }}
        >

          Mis Pedidos 📦

        </Typography>

        <Typography
          sx={{
            color: '#666',
            mt: 1
          }}
        >

          Consulta el estado
          de tus pedidos

        </Typography>

      </Box>

      {pedidos.length === 0 ? (

        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            textAlign: 'center'
          }}
        >

          <Typography
            variant="h6"
          >

            Aún no tienes pedidos.

          </Typography>

        </Card>

      ) : (

        <Stack spacing={3}>

          {pedidos.map((pedido) => (

            <Card
              key={pedido.id}
              sx={{

                borderRadius: 5,

                border:
                  '1px solid #edf2f7',

                boxShadow:
                  '0 6px 18px rgba(0,0,0,0.05)'

              }}
            >

              <Box
                sx={{
                  p: {
                    xs: 2,
                    md: 3
                  }
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={2}
                >

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >

                    <Avatar
                      sx={{
                        background:
                          '#1b5e20'
                      }}
                    >

                      <Inventory2Icon />

                    </Avatar>

                    <Box>

                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: 22
                        }}
                      >

                        Pedido

                      </Typography>

                      <Typography
                        sx={{
                          color: '#777',
                          fontSize: 14
                        }}
                      >

                        {obtenerMensaje(
                          pedido.estado
                        )}

                      </Typography>

                    </Box>

                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                  >

                    <Chip
                      label="Pagado ✅"
                      color="success"
                      sx={{
                        fontWeight: 700
                      }}
                    />

                    <Chip

                      label={
                        pedido.estado ||
                        'Pendiente'
                      }

                      color={obtenerColor(
                        pedido.estado
                      )}

                      sx={{
                        fontWeight: 700
                      }}

                    />

                  </Stack>

                </Stack>

                <Divider
                  sx={{
                    my: 3
                  }}
                />

                <Stepper

                  activeStep={obtenerPaso(
                    pedido.estado
                  )}

                  alternativeLabel

                >

                  {pasos.map(
                    (label) => (

                      <Step key={label}>

                        <StepLabel>

                          {label}

                        </StepLabel>

                      </Step>

                    )
                  )}

                </Stepper>

                <Divider
                  sx={{
                    my: 3
                  }}
                />

                <Stack spacing={1.5}>

                  <Typography>

                    👤 {pedido.nombre}

                  </Typography>

                  <Typography>

                    📞 {pedido.telefono}

                  </Typography>

                  <Typography>

                    📍 {pedido.direccion}

                  </Typography>

                  {pedido.referencia && (

                    <Typography>

                      🏠 {pedido.referencia}

                    </Typography>

                  )}

                </Stack>

                {pedido.ubicacion && (

                  <Button
                    href={pedido.ubicacion}
                    target="_blank"
                    variant="outlined"
                    sx={{
                      mt: 3,
                      borderRadius: 3
                    }}
                  >

                    Ver ubicación

                  </Button>

                )}

                <Divider
                  sx={{
                    my: 3
                  }}
                />

                <Stack spacing={2}>

                  {pedido.productos.map(
                    (
                      producto,
                      index
                    ) => (

                      <Box
                        key={index}
                        sx={{

                          display: 'flex',

                          justifyContent:
                            'space-between',

                          alignItems:
                            'center',

                          flexWrap:
                            'wrap',

                          gap: 1

                        }}
                      >

                        <Typography
                          sx={{
                            fontWeight: 600
                          }}
                        >

                          {producto.nombre}

                        </Typography>

                        <Typography>

                          x
                          {producto.cantidad}

                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 700
                          }}
                        >

                          $
                          {producto.precio *
                            producto.cantidad}

                        </Typography>

                      </Box>

                    )
                  )}

                </Stack>

                <Divider
                  sx={{
                    my: 3
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={2}
                >

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <PaymentsIcon
                      sx={{
                        color: '#2e7d32'
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 30,
                        fontWeight: 900,
                        color: '#1b5e20'
                      }}
                    >

                      ${pedido.total}

                    </Typography>

                  </Stack>

                  <Chip

                    label={
                      pedido.estado ===
                        'Pendiente'

                        ? 'Esperando preparación'

                        : pedido.estado ===
                          'En proceso'

                          ? 'Preparando pedido'

                          : pedido.estado ===
                            'En camino'

                            ? 'Repartidor en camino'

                            : 'Pedido entregado'

                    }

                    color={obtenerColor(
                      pedido.estado
                    )}

                  />

                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      borderRadius: 3
                    }}
                    onClick={() =>
                      descargarTicket(
                        pedido
                      )
                    }
                  >

                    🧾 Descargar Ticket

                  </Button>

                </Stack>

              </Box>

            </Card>

          ))}

        </Stack>

      )}

    </ClientLayout>

  )

}

export default MisPedidos