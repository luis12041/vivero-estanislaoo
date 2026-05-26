import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
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

import {
  db
} from '../firebase/config'

import AdminLayout from '../layouts/AdminLayout'

function DashboardAdmin() {

  const [totalPlantas, setTotalPlantas] = useState(0)

  const [totalPedidos, setTotalPedidos] = useState(0)

  const [totalUsuarios, setTotalUsuarios] = useState(0)

  const [ventas, setVentas] = useState(0)

  useEffect(() => {

    async function cargarDatos() {

      const plantasSnapshot = await getDocs(
        collection(db, 'plantas')
      )

      const pedidosSnapshot = await getDocs(
        collection(db, 'pedidos')
      )

      const usuariosSnapshot = await getDocs(
        collection(db, 'usuarios')
      )

      setTotalPlantas(
        plantasSnapshot.docs.length
      )

      setTotalPedidos(
        pedidosSnapshot.docs.length
      )

      setTotalUsuarios(
        usuariosSnapshot.docs.length
      )

      const totalVentas = pedidosSnapshot.docs.reduce(

        (acc, doc) =>

          acc + doc.data().total,

        0

      )

      setVentas(totalVentas)

    }

    cargarDatos()

  }, [])

  const cards = [

    {
      titulo: 'Plantas',
      valor: totalPlantas,
      icono: '🌿',
      color: '#43a047'
    },

    {
      titulo: 'Pedidos',
      valor: totalPedidos,
      icono: '📦',
      color: '#fb8c00'
    },

    {
      titulo: 'Usuarios',
      valor: totalUsuarios,
      icono: '👤',
      color: '#1e88e5'
    },

    {
      titulo: 'Ventas',
      valor: `$${ventas}`,
      icono: '💰',
      color: '#8e24aa'
    }

  ]

  return (

    <AdminLayout>

      <Box
        sx={{

          minHeight: '100vh',

          backgroundColor: '#f4f6f8',

          p: {
            xs: 2,
            md: 4
          }

        }}
      >

        <Box
          sx={{
            mb: 5
          }}
        >

          <Typography
            variant="h3"
            sx={{

              fontWeight: 800,

              color: '#1b1b1b',

              mb: 1

            }}
          >

            Dashboard Admin ⚡

          </Typography>

          <Typography
            sx={{

              color: '#666',

              fontSize: '18px'

            }}
          >

            Bienvenido al panel administrativo
            de Vivero Estanislaoo 🌱

          </Typography>

        </Box>

        <Grid
          container
          spacing={4}
        >

          {cards.map((card, index) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >

              <Card
                sx={{

                  borderRadius: 5,

                  p: 1,

                  boxShadow:
                    '0 10px 30px rgba(0,0,0,0.08)',

                  transition: '0.3s',

                  '&:hover': {

                    transform:
                      'translateY(-6px)'

                  }

                }}
              >

                <CardContent>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      mb: 3
                    }}
                  >

                    <Box>

                      <Typography
                        sx={{

                          color: '#666',

                          fontWeight: 600,

                          mb: 1

                        }}
                      >

                        {card.titulo}

                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{

                          fontWeight: 800,

                          color: card.color

                        }}
                      >

                        {card.valor}

                      </Typography>

                    </Box>

                    <Typography
                      sx={{
                        fontSize: '50px'
                      }}
                    >

                      {card.icono}

                    </Typography>

                  </Stack>

                  <Divider />

                  <Typography
                    sx={{

                      mt: 2,

                      color: '#888',

                      fontSize: '14px'

                    }}
                  >

                    Actualizado en tiempo real 🚀

                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

        <Grid
          container
          spacing={4}
          sx={{
            mt: 2
          }}
        >

          <Grid
            item
            xs={12}
            md={8}
          >

            <Card
              sx={{

                borderRadius: 5,

                p: 3,

                minHeight: 320,

                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.08)'

              }}
            >

              <Typography
                variant="h5"
                sx={{

                  fontWeight: 700,

                  mb: 3

                }}
              >

                📈 Resumen del sistema

              </Typography>

              <Typography
                sx={{

                  color: '#666',

                  lineHeight: 2,

                  fontSize: '17px'

                }}
              >

                Desde este panel puedes administrar
                las plantas, pedidos, usuarios y
                ventas del sistema 🌱

                <br /><br />

                También podrás monitorear la
                actividad de tu vivero en tiempo
                real y mantener el control total
                de tu tienda.

              </Typography>

            </Card>

          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >

            <Card
              sx={{

                borderRadius: 5,

                p: 3,

                minHeight: 320,

                background:
                  'linear-gradient(135deg,#2e7d32,#43a047)',

                color: 'white',

                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.15)'

              }}
            >

              <Typography
                variant="h5"
                sx={{

                  fontWeight: 700,

                  mb: 3

                }}
              >

                🌱 Estado del vivero

              </Typography>

              <Typography
                sx={{

                  lineHeight: 2,

                  fontSize: '17px'

                }}
              >

                Todo funcionando correctamente ✅

                <br /><br />

                Firebase conectado 🚀

                <br /><br />

                Panel administrativo activo 🔥

              </Typography>

            </Card>

          </Grid>

        </Grid>

      </Box>

    </AdminLayout>

  )
}

export default DashboardAdmin