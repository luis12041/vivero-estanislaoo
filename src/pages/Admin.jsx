import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent
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

function Admin() {

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
      titulo: 'Plantas 🌱',
      valor: totalPlantas
    },

    {
      titulo: 'Pedidos 📦',
      valor: totalPedidos
    },

    {
      titulo: 'Usuarios 👤',
      valor: totalUsuarios
    },

    {
      titulo: 'Ventas 💰',
      valor: `$${ventas}`
    }

  ]

  return (

    <AdminLayout>

      <Box sx={{ p: 2 }}>

        <Typography
          variant="h3"
          sx={{
            mb: 5,
            fontWeight: 700
          }}
        >

          Dashboard Admin ⚡

        </Typography>

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
                  boxShadow: 4
                }}
              >

                <CardContent>

                  <Typography
                    variant="h6"
                    sx={{
                      color: 'gray',
                      mb: 2
                    }}
                  >

                    {card.titulo}

                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main'
                    }}
                  >

                    {card.valor}

                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </AdminLayout>

  )
}

export default Admin