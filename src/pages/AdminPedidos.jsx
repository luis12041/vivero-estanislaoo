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

import SearchIcon from '@mui/icons-material/Search'

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

import { db } from '../firebase/config'

import AdminLayout from '../layouts/AdminLayout'

function AdminPedidos() {

  const [pedidos, setPedidos] =
    useState([])

  const [busqueda, setBusqueda] =
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
          variant="h3"
          sx={{
            fontWeight: 900,
            color: '#111',
            mb: 1
          }}
        >

          Pedidos 📦

        </Typography>

        <Typography
          sx={{
            color: '#777',
            fontSize: 16
          }}
        >

          Gestión y seguimiento
          de pedidos del vivero

        </Typography>

      </Box>

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid item xs={12} md={3}>

          <Card
            sx={{
              p: 3,
              borderRadius: 5,
              boxShadow:
                '0 8px 24px rgba(0,0,0,0.06)',
              height: '100%'
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor:
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

        <Grid item xs={12} md={3}>

          <Card
            sx={{
              p: 3,
              borderRadius: 5,
              boxShadow:
                '0 8px 24px rgba(0,0,0,0.06)',
              height: '100%'
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor:
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

                  Total ventas

                </Typography>

              </Box>

            </Stack>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card
            sx={{
              p: 3,
              borderRadius: 5,
              boxShadow:
                '0 8px 24px rgba(0,0,0,0.06)',
              height: '100%'
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor:
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

                  Pedidos pagados

                </Typography>

              </Box>

            </Stack>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card
            sx={{
              p: 3,
              borderRadius: 5,
              boxShadow:
                '0 8px 24px rgba(0,0,0,0.06)',
              height: '100%'
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor:
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
        sx={{ mb: 4 }}
      >

        <Grid item xs={12} md={8}>

          <TextField
            fullWidth
            placeholder="Buscar por nombre, dirección o notas..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            sx={{
              backgroundColor: 'white',
              borderRadius: 4
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
              backgroundColor: 'white',
              borderRadius: 4
            }}
          >

            <MenuItem value="Todos">
              Todos los estados
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
              lg={6}
              sx={{
                display: 'flex'
              }}
              key={pedido.id}
            >

              <Card
                sx={{

                  width: '100%',

                  minHeight: 360,

                  display: 'flex',

                  flexDirection: 'column',

                  justifyContent:
                    'space-between',

                  borderRadius: 5,

                  overflow: 'hidden',

                  border:
                    '1px solid #e9ecef',

                  boxShadow:
                    '0 8px 24px rgba(0,0,0,0.06)',

                  transition: '0.3s',

                  background:
                    'linear-gradient(to bottom,#ffffff,#fcfcfc)',

                  '&:hover': {

                    transform:
                      'translateY(-5px)',

                    boxShadow:
                      '0 12px 30px rgba(0,0,0,0.10)'

                  }

                }}
              >

                <Box
                  sx={{

                    px: 3,

                    py: 2,

                    background:
                      '#ffffff',

                    borderBottom:
                      '1px solid #f0f0f0'

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
                            fontSize: 22
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
                        fontWeight: 700,
                        borderRadius: 3
                      }}

                    />

                  </Stack>

                </Box>

                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1
                  }}
                >

                  <Stack spacing={2}>

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

                      <Typography
                        sx={{
                          fontSize: 16
                        }}
                      >

                        {pedido.direccion}

                      </Typography>

                    </Stack>

                    <Divider />

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

                      <Typography
                        sx={{
                          fontSize: 16
                        }}
                      >

                        {pedido.notas ||
                          'Sin notas'}

                      </Typography>

                    </Stack>

                    <Divider />

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

                    </Stack>

                  </Stack>

                </Box>

                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    borderTop:
                      '1px solid #f0f0f0'
                  }}
                >

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <CalendarMonthIcon
                      sx={{
                        color: '#777'
                      }}
                    />

                    <Typography
                      sx={{
                        color: '#777'
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