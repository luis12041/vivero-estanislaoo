import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Divider
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

          Control y seguimiento de pedidos realizados

        </Typography>

      </Box>

      <Grid container spacing={4}>

        {pedidos.map((pedido) => (

          <Grid
            item
            xs={12}
            lg={6}
            key={pedido.id}
          >

            <Card
              sx={{
                borderRadius: 6,
                overflow: 'hidden',
                background:
                  'linear-gradient(145deg,#ffffff,#f8f8f8)',
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.08)',
                transition: '0.3s',

                '&:hover': {
                  transform:
                    'translateY(-6px)',
                  boxShadow:
                    '0 15px 40px rgba(0,0,0,0.12)'
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

                  <Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800
                      }}
                    >

                      {pedido.nombre}

                    </Typography>

                    <Typography
                      sx={{
                        opacity: 0.9
                      }}
                    >

                      Pedido registrado

                    </Typography>

                  </Box>

                  <ShoppingBagIcon
                    sx={{
                      fontSize: 45
                    }}
                  />

                </Stack>

              </Box>

              <CardContent
                sx={{
                  p: 4
                }}
              >

                <Stack spacing={3}>

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
                      alignItems: 'center',
                      gap: 2
                    }}
                  >

                    <PaymentsIcon
                      sx={{
                        color: '#2e7d32'
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: '#1b5e20'
                      }}
                    >

                      ${pedido.total}

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
                        px: 1
                      }}
                    />

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