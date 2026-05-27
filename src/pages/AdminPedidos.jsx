import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Divider,
  Avatar
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  getDocs
} from 'firebase/firestore'

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

import { db } from '../firebase/config'

import AdminLayout from '../layouts/AdminLayout'

function AdminPedidos() {

  const [pedidos, setPedidos] =
    useState([])

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

  return (

    <AdminLayout>

      <Box
        sx={{
          mb: 5
        }}
      >

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: '#1b1b1b'
          }}
        >

          Pedidos 📦

        </Typography>

        <Typography
          sx={{
            color: '#666',
            mt: 1,
            fontSize: 18
          }}
        >

          Gestión profesional de pedidos del vivero

        </Typography>

      </Box>

      <Grid container spacing={3}>

        {pedidos.map((pedido) => (

          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            key={pedido.id}
          >

            <Card
              sx={{

                borderRadius: 6,

                overflow: 'hidden',

                backgroundColor: 'white',

                border:
                  '1px solid #ececec',

                boxShadow:
                  '0 10px 25px rgba(0,0,0,0.06)',

                transition: '0.3s',

                height: '100%',

                '&:hover': {

                  transform:
                    'translateY(-6px)',

                  boxShadow:
                    '0 18px 40px rgba(0,0,0,0.10)'

                }

              }}
            >

              <Box
                sx={{
                  background:
                    'linear-gradient(135deg,#1b5e20,#43a047)',

                  p: 3,

                  color: 'white'
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
                        backgroundColor:
                          'rgba(255,255,255,0.25)',

                        width: 55,

                        height: 55
                      }}
                    >

                      <PersonIcon />

                    </Avatar>

                    <Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800
                        }}
                      >

                        {pedido.nombre}

                      </Typography>

                      <Typography
                        sx={{
                          opacity: 0.9,
                          fontSize: 14
                        }}
                      >

                        Pedido registrado

                      </Typography>

                    </Box>

                  </Stack>

                  <ShoppingBagIcon
                    sx={{
                      fontSize: 38
                    }}
                  />

                </Stack>

              </Box>

              <CardContent
                sx={{
                  p: 3
                }}
              >

                <Stack spacing={2.5}>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >

                    <LocationOnIcon
                      sx={{
                        color: '#2e7d32'
                      }}
                    />

                    <Typography
                      sx={{
                        color: '#444',
                        fontWeight: 500
                      }}
                    >

                      {pedido.direccion}

                    </Typography>

                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >

                    <NotesIcon
                      sx={{
                        color: '#2e7d32'
                      }}
                    />

                    <Typography
                      sx={{
                        color: '#555'
                      }}
                    >

                      {pedido.notas || 'Sin notas'}

                    </Typography>

                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'center'
                    }}
                  >

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
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

                    </Box>

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

                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >

                    <CalendarMonthIcon
                      sx={{
                        color: '#777'
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

                  </Box>

                </Stack>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </AdminLayout>

  )

}

export default AdminPedidos