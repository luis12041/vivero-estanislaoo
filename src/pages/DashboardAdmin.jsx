import {
  Typography,
  Box,
  Grid,
  Card,
  Stack,
  Avatar,
  Divider,
  Chip
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

import AdminLayout
  from '../layouts/AdminLayout'

import Inventory2Icon
  from '@mui/icons-material/Inventory2'

import ShoppingBagIcon
  from '@mui/icons-material/ShoppingBag'

import PeopleIcon
  from '@mui/icons-material/People'

import PaymentsIcon
  from '@mui/icons-material/Payments'

import WarningAmberIcon
  from '@mui/icons-material/WarningAmber'

import TrendingUpIcon
  from '@mui/icons-material/TrendingUp'

function DashboardAdmin() {

  const [totalPlantas,
    setTotalPlantas] =
    useState(0)

  const [totalPedidos,
    setTotalPedidos] =
    useState(0)

  const [totalUsuarios,
    setTotalUsuarios] =
    useState(0)

  const [ventas,
    setVentas] =
    useState(0)

  const [plantaMasVendida,
    setPlantaMasVendida] =
    useState('Ninguna')

  const [tipoLuzMasVendido,
    setTipoLuzMasVendido] =
    useState('Ninguno')

  const [pedidosEntregados,
    setPedidosEntregados] =
    useState(0)

  const [agotados,
    setAgotados] =
    useState([])

  const [ultimosPedidos,
    setUltimosPedidos] =
    useState([])

  useEffect(() => {

    async function cargarDatos() {

      const plantasSnapshot =
        await getDocs(
          collection(
            db,
            'plantas'
          )
        )

      const pedidosSnapshot =
        await getDocs(
          collection(
            db,
            'pedidos'
          )
        )

      const historialSnapshot =
        await getDocs(
          collection(
            db,
            'historial_pedidos'
          )
        )

      const usuariosSnapshot =
        await getDocs(
          collection(
            db,
            'usuarios'
          )
        )

      const plantas =
        plantasSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        )

      const pedidos =
        pedidosSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        )

      const historial =
        historialSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        )

      setTotalPlantas(
        plantas.length
      )

      setTotalPedidos(
        pedidos.length
      )

      setTotalUsuarios(
        usuariosSnapshot.docs.length
      )

      const totalVentas =

        historial.reduce(

          (acc, pedido) =>

            acc +
            (pedido.total || 0),

          0

        )

      setPedidosEntregados(
        historial.length
      )

      const conteoPlantas = {}

      const conteoLuz = {}

      historial.forEach(
        (pedido) => {

          pedido.productos?.forEach(
            (producto) => {

              conteoPlantas[
                producto.nombre
              ] =

                (
                  conteoPlantas[
                  producto.nombre
                  ] || 0
                )

                +

                producto.cantidad

              conteoLuz[
                producto.tipoLuz
              ] =

                (
                  conteoLuz[
                  producto.tipoLuz
                  ] || 0
                )

                +

                producto.cantidad

            }
          )

        }
      )

      const plantaTop =

        Object.keys(
          conteoPlantas
        ).length > 0

          ?

          Object.keys(
            conteoPlantas
          ).reduce(

            (a, b) =>

              conteoPlantas[a] >
                conteoPlantas[b]

                ? a

                : b

          )

          :

          'Ninguna'

      const luzTop =

        Object.keys(
          conteoLuz
        ).length > 0

          ?

          Object.keys(
            conteoLuz
          ).reduce(

            (a, b) =>

              conteoLuz[a] >
                conteoLuz[b]

                ? a

                : b

          )

          :

          'Ninguno'

      setPlantaMasVendida(
        plantaTop
      )

      setTipoLuzMasVendido(
        luzTop
      )



      setVentas(totalVentas)

      const productosAgotados =

        plantas.filter(

          (planta) =>

            planta.stock <= 30

        )

      setAgotados(
        productosAgotados
      )

      setUltimosPedidos(
        pedidos.slice(-5).reverse()
      )

    }

    cargarDatos()

  }, [])

  const cards = [

    {

      titulo: 'Plantas',

      valor: totalPlantas,

      icono:
        <Inventory2Icon />,

      color: '#43a047'

    },

    {

      titulo: 'Pedidos',

      valor: totalPedidos,

      icono:
        <ShoppingBagIcon />,

      color: '#fb8c00'

    },

    {

      titulo: 'Usuarios',

      valor: totalUsuarios,

      icono:
        <PeopleIcon />,

      color: '#1e88e5'

    },

    {

      titulo: 'Ventas',

      valor: `$${ventas}`,

      icono:
        <PaymentsIcon />,

      color: '#8e24aa'

    }
    ,
    {

      titulo:
        'Entregados',

      valor:
        pedidosEntregados,

      icono:
        <ShoppingBagIcon />,

      color:
        '#2e7d32'

    },

    {

      titulo:
        'Top Planta',

      valor:
        plantaMasVendida,

      icono:
        <Inventory2Icon />,

      color:
        '#00897b'

    },

    {

      titulo:
        'Tipo Luz',

      valor:
        tipoLuzMasVendido,

      icono:
        <WarningAmberIcon />,

      color:
        '#f9a825'

    }

  ]



  return (

    <AdminLayout>

      <Box
        sx={{
          mb: 4
        }}
      >

        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 42
            },

            fontWeight: 900
          }}
        >

          Dashboard ⚡

        </Typography>

        <Typography
          sx={{
            color: '#666',
            mt: 1
          }}
        >

          Panel administrativo
          del vivero 🌱

        </Typography>

      </Box>

      <Grid
        container
        spacing={2}
      >

        {cards.map(
          (card, index) => (

            <Grid
              item
              xs={6}
              md={3}
              key={index}
            >

              <Card
                sx={{

                  p: {
                    xs: 1.5,
                    md: 2
                  },

                  borderRadius: 4,

                  border:
                    '1px solid #edf2f7',

                  boxShadow:
                    '0 6px 18px rgba(0,0,0,0.04)'

                }}
              >

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >

                  <Avatar
                    sx={{

                      width: 48,

                      height: 48,

                      background:
                        '#f4f6f8',

                      color:
                        card.color

                    }}
                  >

                    {card.icono}

                  </Avatar>

                  <Box>

                    <Typography
                      sx={{
                        color: '#666',
                        fontSize: 13
                      }}
                    >

                      {card.titulo}

                    </Typography>

                    <Typography
                      sx={{

                        fontSize: {
                          xs: 22,
                          md: 32
                        },

                        fontWeight: 900,

                        color:
                          card.color

                      }}
                    >

                      {card.valor}

                    </Typography>

                  </Box>

                </Stack>

              </Card>

            </Grid>

          )
        )}

      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          mt: 1
        }}
      >

        <Grid
          item
          xs={12}
          md={8}
        >

          <Card
            sx={{

              p: 3,

              borderRadius: 4,

              border:
                '1px solid #edf2f7',

              boxShadow:
                '0 6px 18px rgba(0,0,0,0.04)'

            }}
          >

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                mb: 3
              }}
            >

              <TrendingUpIcon
                sx={{
                  color: '#2e7d32'
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 22
                }}
              >

                Últimos pedidos

              </Typography>

            </Stack>

            <Stack spacing={2}>

              {ultimosPedidos.map(
                (pedido) => (

                  <Box
                    key={pedido.id}
                  >

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={1}
                    >

                      <Box>

                        <Typography
                          sx={{
                            fontWeight: 700
                          }}
                        >

                          {
                            pedido.folio
                          }

                        </Typography>

                        <Typography
                          sx={{
                            color: '#777',
                            fontSize: 14
                          }}
                        >

                          {
                            pedido.nombre
                          }

                        </Typography>

                      </Box>

                      <Chip

                        label={
                          pedido.estado
                        }

                        color={

                          pedido.estado ===
                            'En camino'

                            ? 'info'

                            :

                            pedido.estado ===
                              'En proceso'

                              ? 'secondary'

                              :

                              pedido.estado ===
                                'Entregado'

                                ? 'success'

                                :

                                'warning'

                        }

                      />

                    </Stack>

                    <Divider
                      sx={{
                        mt: 2
                      }}
                    />

                  </Box>

                )
              )}

            </Stack>

          </Card>

        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >

          <Card
            sx={{

              p: 3,

              borderRadius: 4,

              background:
                'linear-gradient(135deg,#1b5e20,#43a047)',

              color: 'white',

              boxShadow:
                '0 10px 24px rgba(0,0,0,0.12)'

            }}
          >

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                mb: 3
              }}
            >

              <WarningAmberIcon />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 22
                }}
              >

                Alertas

              </Typography>

            </Stack>

            <Stack spacing={2}>

              {agotados.length === 0 ? (

                <Typography>

                  Todo el stock
                  está correcto 😎🔥

                </Typography>

              ) : (

                agotados.map(
                  (planta) => (

                    <Box
                      key={planta.id}
                    >

                      <Typography
                        sx={{
                          fontWeight: 700
                        }}
                      >

                        ⚠️ {
                          planta.nombre
                        }

                      </Typography>

                      <Typography
                        sx={{
                          opacity: 0.8,
                          fontSize: 14
                        }}
                      >

                        Stock:
                        {planta.stock}

                      </Typography>

                    </Box>

                  )
                )

              )}

            </Stack>

          </Card>

        </Grid>

      </Grid>

    </AdminLayout>

  )

}

export default DashboardAdmin