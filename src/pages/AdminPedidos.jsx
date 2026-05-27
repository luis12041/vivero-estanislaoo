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

      <Box
        sx={{
          mb: 5
        }}
      >

        <Typography
          sx={{
            fontSize: {
              xs: 38,
              md: 48
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
            fontSize: 16,
            mt: 1
          }}
        >

          Gestión y seguimiento
          profesional de pedidos

        </Typography>

      </Box>

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4
        }}
      >

        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{

              p: 3,

              borderRadius: 5,

              boxShadow:
                '0 6px 20px rgba(0,0,0,0.05)',

              border:
                '1px solid #edf2f7'

            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background:
                    '#e8f5e9',
                  color: '#2e7d32'
                }}
              >

                <ShoppingBagIcon />

              </Avatar>

              <Box>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 900
                  }}
                >

                  {pedidos.length}

                </Typography>

                <Typography
                  sx={{
                    color: '#666'
                  }}
                >

                  Total pedidos

                </Typography>

              </Box>

            </Stack>

          </Card>

        </Grid>

        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{

              p: 3,

              borderRadius: 5,

              boxShadow:
                '0 6px 20px rgba(0,0,0,0.05)',

              border:
                '1px solid #edf2f7'

            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background:
                    '#e8f5e9',
                  color: '#2e7d32'
                }}
              >

                <PaymentsIcon />

              </Avatar>

              <Box>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 900
                  }}
                >

                  ${totalVentas}

                </Typography>

                <Typography
                  sx={{
                    color: '#666'
                  }}
                >

                  Ventas

                </Typography>

              </Box>

            </Stack>

          </Card>

        </Grid>

        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{

              p: 3,

              borderRadius: 5,

              boxShadow:
                '0 6px 20px rgba(0,0,0,0.05)',

              border:
                '1px solid #edf2f7'

            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background:
                    '#e8f5e9',
                  color: '#2e7d32'
                }}
              >

                <CheckCircleIcon />

              </Avatar>

              <Box>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 900
                  }}
                >

                  {pedidosPagados}

                </Typography>

                <Typography
                  sx={{
                    color: '#666'
                  }}
                >

                  Pagados

                </Typography>

              </Box>

            </Stack>

          </Card>

        </Grid>

        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{

              p: 3,

              borderRadius: 5,

              boxShadow:
                '0 6px 20px rgba(0,0,0,0.05)',

              border:
                '1px solid #edf2f7'

            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background:
                    '#fff3e0',
                  color: '#f57c00'
                }}
              >

                <PendingIcon />

              </Avatar>

              <Box>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 900
                  }}
                >

                  {pedidosPendientes}

                </Typography>

                <Typography
                  sx={{
                    color: '#666'
                  }}
                >

                  Pendientes

                </Typography>

              </Box>

            </Stack>

          </Card>

        </Grid>

      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          mb: 5
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
            sx={{
              background:
                'white',

              borderRadius: 4,

              '& .MuiOutlinedInput-root': {

                borderRadius: 4

              }

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
            value={filtroEstado}
            onChange={(e) =>
              setFiltroEstado(
                e.target.value
              )
            }
            sx={{
              background:
                'white',

              borderRadius: 4,

              '& .MuiOutlinedInput-root': {

                borderRadius: 4

              }

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

      <Grid container spacing={3}>

        {pedidosFiltrados.map(
          (pedido) => (

            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={pedido.id}
            >

              <Card
                sx={{

                  height: '100%',

                  borderRadius: 5,

                  background:
                    '#ffffff',

                  border:
                    '1px solid #edf2f7',

                  boxShadow:
                    '0 8px 25px rgba(0,0,0,0.04)',

                  transition: '0.25s',

                  '&:hover': {

                    transform:
                      'translateY(-6px)',

                    boxShadow:
                      '0 14px 35px rgba(0,0,0,0.08)'

                  }

                }}
              >

                <Box
                  sx={{
                    p: 3
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
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

                        <PersonIcon />

                      </Avatar>

                      <Box>

                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: 22,
                            lineHeight: 1.2
                          }}
                        >

                          {pedido.nombre}

                        </Typography>

                        <Typography
                          sx={{
                            color: '#777',
                            fontSize: 14
                          }}
                        >

                          Pedido registrado

                        </Typography>

                      </Box>

                    </Stack>

                    <Chip
                      label={pedido.estado}
                      color={
                        pedido.estado ===
                        'Pagado'
                          ? 'success'
                          : 'warning'
                      }
                      sx={{
                        fontWeight: 700
                      }}
                    />

                  </Stack>

                  <Divider
                    sx={{
                      my: 3
                    }}
                  />

                  <Stack spacing={2.5}>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <LocationOnIcon
                        sx={{
                          color: '#2e7d32'
                        }}
                      />

                      <Typography>

                        {pedido.direccion}

                      </Typography>

                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <NotesIcon
                        sx={{
                          color: '#2e7d32'
                        }}
                      />

                      <Typography>

                        {pedido.notas ||
                          'Sin notas'}

                      </Typography>

                    </Stack>

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
                          fontSize: 38,
                          fontWeight: 900,
                          color: '#1b5e20'
                        }}
                      >

                        ${pedido.total}

                      </Typography>

                    </Stack>

                    <Chip
                      label="Activo"
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
                      mt: 3
                    }}
                  >

                    <CalendarMonthIcon
                      sx={{
                        color: '#777',
                        fontSize: 20
                      }}
                    />

                    <Typography
                      sx={{
                        color: '#777',
                        fontSize: 14
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