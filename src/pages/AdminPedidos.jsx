import {
  Box,
  Typography,
  Card,
  Grid,
  Chip,
  Stack,
  Divider,
  Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Button
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc
} from 'firebase/firestore'

import SearchIcon
  from '@mui/icons-material/Search'

import LocationOnIcon
  from '@mui/icons-material/LocationOn'

import NotesIcon
  from '@mui/icons-material/Notes'

import PaymentsIcon
  from '@mui/icons-material/Payments'

import ShoppingBagIcon
  from '@mui/icons-material/ShoppingBag'

import CalendarMonthIcon
  from '@mui/icons-material/CalendarMonth'

import PersonIcon
  from '@mui/icons-material/Person'

import CheckCircleIcon
  from '@mui/icons-material/CheckCircle'

import PendingIcon
  from '@mui/icons-material/Pending'

import LocalShippingIcon
  from '@mui/icons-material/LocalShipping'

import { db }
  from '../firebase/config'

import AdminLayout
  from '../layouts/AdminLayout'

function AdminPedidos() {

  const [pedidos, setPedidos] =
    useState([])

  const [busqueda,
    setBusqueda] =
    useState('')

  const [filtroEstado,
    setFiltroEstado] =
    useState('Todos')

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          'pedidos'
        ),

        (snapshot) => {

          const data =
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

          setPedidos(data)

        }

      )

    return () => unsubscribe()

  }, [])

  async function cambiarEstado(
    pedido
  ) {

    const pedidoRef =
      doc(
        db,
        'pedidos',
        pedido.id
      )

    if (
      pedido.tipoEntrega ===
      'Tienda'
    ) {

      if (
        pedido.estado ===
        'Listo para recoger'
      ) {

        await addDoc(

          collection(
            db,
            'historial_pedidos'
          ),

          {

            ...pedido,

            estado:
              'Recogido',

            fechaEntrega:
              new Date()

          }

        )

        await deleteDoc(
          pedidoRef
        )

      }

      return

    }

    if (
      pedido.estado ===
      'Pendiente'
    ) {

      await updateDoc(
        pedidoRef,
        {
          estado:
            'En proceso'
        }
      )

    }

    else if (
      pedido.estado ===
      'En proceso'
    ) {

      await updateDoc(
        pedidoRef,
        {
          estado:
            'En camino'
        }
      )

    }

    else if (
      pedido.estado ===
      'En camino'
    ) {

      await addDoc(

        collection(
          db,
          'historial_pedidos'
        ),

        {

          ...pedido,

          estado:
            'Entregado',

          fechaEntrega:
            new Date()

        }

      )

      await deleteDoc(
        pedidoRef
      )

    }

  }

  const pedidosFiltrados =
    pedidos.filter((pedido) => {

      const texto =
        `${pedido.nombre}
        ${pedido.direccion}
        ${pedido.notas}`

      const coincideBusqueda =
        texto
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

      const coincideEstado =

        filtroEstado === 'Todos'
          ? true
          : pedido.estado ===
          filtroEstado

      return (
        coincideBusqueda &&
        coincideEstado
      )

    })

  const totalVentas =
    pedidos.reduce(
      (acc, pedido) =>
        acc + (pedido.total || 0),
      0
    )

  const pedidosPagados =
    pedidos.filter(
      (p) => p.pagado === true
    ).length

  const pedidosPendientes =
    pedidos.filter(
      (p) =>
        p.estado ===
        'Pendiente'
    ).length

  return (

    <AdminLayout>

      <Box sx={{ mb: 4 }}>

        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 40
            },

            fontWeight: 900,

            color: '#111'
          }}
        >

          Pedidos 📦

        </Typography>

        <Typography
          sx={{
            color: '#6b7280',
            fontSize: 14,
            mt: 0.5
          }}
        >

          Gestión de pedidos

        </Typography>

      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          mb: 3
        }}
      >

        {[

          {
            label: 'Pedidos',
            value: pedidos.length,
            icon: <ShoppingBagIcon />,
            color: '#2e7d32'
          },

          {
            label: 'Ventas',
            value: `$${totalVentas}`,
            icon: <PaymentsIcon />,
            color: '#1b5e20'
          },

          {
            label: 'Pagados',
            value: pedidosPagados,
            icon: <CheckCircleIcon />,
            color: '#43a047'
          },

          {
            label: 'Pendientes',
            value: pedidosPendientes,
            icon: <PendingIcon />,
            color: '#f57c00'
          }

        ].map((item) => (

          <Grid
            item
            xs={6}
            md={3}
            key={item.label}
          >

            <Card
              sx={{

                p: {
                  xs: 1.5,
                  md: 2
                },

                borderRadius: 4,

                boxShadow:
                  '0 4px 14px rgba(0,0,0,0.05)',

                border:
                  '1px solid #edf2f7'

              }}
            >

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >

                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    background:
                      '#f1f8f2',

                    color: item.color
                  }}
                >

                  {item.icon}

                </Avatar>

                <Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 20,
                        md: 28
                      },

                      fontWeight: 900
                    }}
                  >

                    {item.value}

                  </Typography>

                  <Typography
                    sx={{
                      color: '#666',
                      fontSize: 13
                    }}
                  >

                    {item.label}

                  </Typography>


                </Box>

              </Stack>

            </Card>

          </Grid>

        ))}

      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          mb: 3
        }}
      >

        <Grid item xs={12} md={8}>

          <TextField
            fullWidth
            placeholder="Buscar pedidos..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            size="small"
            sx={{
              background:
                'white',

              borderRadius: 3
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">

                  <SearchIcon />

                </InputAdornment>
              )
            }}
          />

        </Grid>

        <Grid item xs={12} md={4}>

          <TextField
            select
            fullWidth
            size="small"
            value={filtroEstado}
            onChange={(e) =>
              setFiltroEstado(
                e.target.value
              )
            }
            sx={{
              background:
                'white',

              borderRadius: 3
            }}
          >

            <MenuItem value="Todos">
              Todos
            </MenuItem>

            <MenuItem value="Pendiente">
              Pendiente
            </MenuItem>
            <MenuItem value="En proceso">
              En proceso
            </MenuItem>

            <MenuItem value="En camino">
              En camino
            </MenuItem>

            <MenuItem value="Entregado">
              Entregado
            </MenuItem>

          </TextField>

        </Grid>

      </Grid>

      <Grid container spacing={2}>

        {pedidosFiltrados.map(
          (pedido) => (

            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={pedido.id}
            >

              <Card
                sx={{

                  borderRadius: 4,

                  border:
                    '1px solid #edf2f7',

                  boxShadow:
                    '0 6px 18px rgba(0,0,0,0.04)',

                  transition: '0.2s',

                  '&:hover': {

                    transform:
                      'translateY(-4px)',

                    boxShadow:
                      '0 10px 24px rgba(0,0,0,0.08)'

                  }

                }}
              >

                <Box
                  sx={{
                    p: {
                      xs: 1.8,
                      md: 2.5
                    }
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >

                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >

                      <Avatar
                        sx={{
                          width: 42,
                          height: 42,
                          background:
                            '#1b5e20'
                        }}
                      >

                        <PersonIcon />

                      </Avatar>

                      <Box>

                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: {
                              xs: 16,
                              md: 18
                            },

                            lineHeight: 1.2
                          }}
                        >

                          {pedido.nombre}

                        </Typography>

                        <Typography
                          sx={{
                            color: '#777',
                            fontSize: 12
                          }}
                        >

                          Pedido registrado

                        </Typography>

                      </Box>

                    </Stack>

                    <Chip

                      label={
                        pedido.estado ||
                        'Pendiente'
                      }

                      size="small"

                      color={
                        pedido.estado ===
                          'Pendiente'
                          ? 'warning'
                          : pedido.estado ===
                            'En proceso'
                            ? 'secondary'
                            : pedido.estado ===
                              'En camino'
                              ? 'info'
                              : 'success'
                      }

                    />

                  </Stack>

                  <Divider
                    sx={{
                      my: 2
                    }}
                  />

                  <Stack spacing={1.8}>

                    {
                      pedido.tipoEntrega !== 'Tienda' && (

                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >

                          <LocationOnIcon
                            sx={{
                              color: '#2e7d32',
                              fontSize: 20
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 14
                            }}
                          >

                            {pedido.direccion}

                          </Typography>

                        </Stack>

                      )
                    }

                    <Stack spacing={1}>



                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >

                        <NotesIcon
                          sx={{
                            color: '#2e7d32',
                            fontSize: 20
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: 14
                          }}
                        >

                          {pedido.notas || 'Sin notas'}

                        </Typography>

                      </Stack>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600
                        }}
                      >

                        {
                          pedido.tipoEntrega === 'Tienda'
                            ? '🏪 Recoger en tienda'
                            : '🚚 Envío a domicilio'
                        }

                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600
                        }}
                      >

                        {
                          pedido.metodoPago === 'Efectivo'
                            ? '💵 Pago en efectivo'
                            : '💳 Pago con Stripe'
                        }

                      </Typography>

                    </Stack>

                    {
                      pedido.ubicacion && (

                        <Button

                          href={pedido.ubicacion}

                          target="_blank"

                          variant="outlined"

                          startIcon={
                            <LocationOnIcon />
                          }

                          sx={{
                            mt: 1,
                            borderRadius: 3
                          }}

                        >

                          Ver ubicación

                        </Button>

                      )
                    }

                    <Typography
                      sx={{
                        fontWeight: 700,
                        mb: 1
                      }}
                    >

                      🌱 Productos

                    </Typography>

                    <Stack
                      spacing={1}
                      sx={{
                        mb: 2
                      }}
                    >

                      {pedido.productos?.map(
                        (producto, index) => (

                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}
                          >

                            <Typography>

                              {producto.nombre} x{producto.cantidad}

                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: 600
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
                        my: 2
                      }}
                    />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
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
                            fontSize: {
                              xs: 28,
                              md: 34
                            },

                            fontWeight: 900,

                            color: '#1b5e20'
                          }}
                        >

                          ${pedido.total}

                        </Typography>
                      </Stack>

                    </Stack>

                    {
                      pedido.estado !== 'Entregado' && (

                        <Button

                          fullWidth

                          variant="contained"

                          startIcon={<LocalShippingIcon />}

                          onClick={() =>
                            cambiarEstado(
                              pedido
                            )
                          }

                          sx={{

                            mt: 3,

                            borderRadius: 3,

                            py: 1.2,

                            fontWeight: 700,

                            background: '#1b5e20'

                          }}

                        >

                          {
                            pedido.tipoEntrega ===
                              'Tienda'

                              ? 'Marcar recogido'

                              : pedido.estado ===
                                'Pendiente'

                                ? 'Pasar a proceso'

                                : pedido.estado ===
                                  'En proceso'

                                  ? 'Marcar en camino'

                                  : pedido.estado ===
                                    'En camino'

                                    ? 'Marcar entregado'

                                    : 'Entregado'
                          }

                        </Button>
                      )
                    }
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        mt: 2
                      }}
                    >

                      <CalendarMonthIcon
                        sx={{
                          color: '#777',
                          fontSize: 18
                        }}
                      />

                      <Typography
                        sx={{
                          color: '#777',
                          fontSize: 12
                        }}
                      >
                        {pedido.fechaBonita || 'Pedido activo'}
                      </Typography>

                    </Stack>
                  </Stack>
                </Box>

              </Card>

            </Grid>

          )

        )}

      </Grid>

    </AdminLayout >

  )

}

export default AdminPedidos