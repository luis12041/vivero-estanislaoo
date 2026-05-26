import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
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
  auth,
  db
} from '../firebase/config'

import ClientLayout from '../layouts/ClientLayout'

function MisPedidos() {

  const [pedidos, setPedidos] = useState([])

  useEffect(() => {

    async function cargarPedidos() {

      const usuario = auth.currentUser

      if (!usuario) return

      const snapshot = await getDocs(
        collection(db, 'pedidos')
      )

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(
          (pedido) =>
            pedido.usuario === usuario.email
        )

      setPedidos(data)

    }

    cargarPedidos()

  }, [])

  return (

    <ClientLayout>

      <Typography
        variant="h3"
        sx={{
          mb: 5,
          fontWeight: 700
        }}
      >

        Mis Pedidos 📦

      </Typography>

      {pedidos.length === 0 ? (

        <Typography variant="h6">

          Aún no tienes pedidos.

        </Typography>

      ) : (

        <Stack spacing={4}>

          {pedidos.map((pedido) => (

            <Card
              key={pedido.id}
              sx={{
                borderRadius: 5
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

                    Pedido

                  </Typography>

                  <Chip
                    label={`Total: $${pedido.total}`}
                    color="success"
                    sx={{
                      width: 'fit-content'
                    }}
                  />

                  <Typography
                    sx={{
                      color: 'gray'
                    }}
                  >

                    Usuario:
                    {' '}
                    {pedido.usuario}

                  </Typography>

                  <Divider />

                  {pedido.productos.map(
                    (producto, index) => (

                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 2
                        }}
                      >

                        <Typography>

                          {producto.nombre}

                        </Typography>

                        <Typography>

                          x{producto.cantidad}

                        </Typography>

                        <Typography>

                          $
                          {producto.precio *
                            producto.cantidad}

                        </Typography>

                      </Box>

                    )
                  )}

                </Stack>

              </CardContent>

            </Card>

          ))}

        </Stack>

      )}

    </ClientLayout>

  )
}

export default MisPedidos