import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  getDocs
} from 'firebase/firestore'

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

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 4
        }}
      >

        Pedidos 📦

      </Typography>

      <Grid container spacing={4}>

        {pedidos.map((pedido) => (

          <Grid
            item
            xs={12}
            md={6}
            key={pedido.id}
          >

            <Card
              sx={{
                borderRadius: 5,
                boxShadow:
                  '0 10px 25px rgba(0,0,0,0.08)'
              }}
            >

              <CardContent>

                <Stack spacing={2}>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700
                    }}
                  >

                    {pedido.nombre}

                  </Typography>

                  <Typography>

                    📍 {pedido.direccion}

                  </Typography>

                  <Typography>

                    📝 {pedido.notas}

                  </Typography>

                  <Typography>

                    💰 ${pedido.total}

                  </Typography>

                  <Chip
                    label={pedido.estado}
                    color="success"
                    sx={{
                      width: 'fit-content'
                    }}
                  />

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