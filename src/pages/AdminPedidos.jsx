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
  MenuItem
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  getDocs
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

    async function cargarPedidos() {

      const snapshot =
        await getDocs(
          collection(db, 'pedidos')
        )

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

      setPedidos(data)

    }

    cargarPedidos()

  }, [])

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
      (p) => p.estado === 'Pagado'
    ).length

  const pedidosPendientes =
    pedidos.filter(
      (p) => p.estado === 'Pendiente'
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

            <MenuItem value="Pagado">
              Pagado
            </MenuItem>

            <MenuItem value="Pendiente">
              Pendiente
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
                      label={pedido.estado}
                      size="small"
                      color={
                        pedido.estado ===
                        'Pagado'
                          ? 'success'
                          : 'warning'
                      }
                    />

                  </Stack>

                  <Divider
                    sx={{
                      my: 2
                    }}
                  />

                  <Stack spacing={1.8}>

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

                        {pedido.notas ||
                          'Sin notas'}

                      </Typography>

                    </Stack>

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

                    <Chip
                      label="Activo"
                      size="small"
                      sx={{
                        background:
                          '#e8f5e9',

                        color:
                          '#1b5e20',

                        fontWeight: 700
                      }}
                    />

                  </Stack>

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

                      Pedido activo

                    </Typography>

                  </Stack>

                </Box>

              </Card>

            </Grid>

          )
        )}

      </Grid>

    </AdminLayout>

  )

}

export default AdminPedidos