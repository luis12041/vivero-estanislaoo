import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Stack
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  useParams
} from 'react-router-dom'

import {
  doc,
  getDoc
} from 'firebase/firestore'

import { db } from '../firebase/config'

import ClientLayout from '../layouts/ClientLayout'

import { useCart } from '../context/CartContext'

function DetallePlanta() {

  const { id } = useParams()

  const { agregarAlCarrito } = useCart()

  const [planta, setPlanta] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function cargarPlanta() {

      const plantaRef = doc(db, 'plantas', id)

      const snapshot = await getDoc(plantaRef)

      if (snapshot.exists()) {

        setPlanta({

          id: snapshot.id,

          ...snapshot.data()

        })

      }

      setLoading(false)

    }

    cargarPlanta()

  }, [id])

  if (loading) {

    return (

      <ClientLayout>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 10
          }}
        >

          <CircularProgress />

        </Box>

      </ClientLayout>

    )

  }

  if (!planta) {

    return (

      <ClientLayout>

        <Typography variant="h4">

          Planta no encontrada.

        </Typography>

      </ClientLayout>

    )

  }

  return (

    <ClientLayout>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr'
          },
          gap: 5,
          alignItems: 'center'
        }}
      >

        <Box
          component="img"
          src={planta.imagen}
          alt={planta.nombre}
          sx={{
            width: '100%',
            borderRadius: 5,
            boxShadow: 4
          }}
        />

        <Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2
            }}
          >

            {planta.nombre}

          </Typography>

          <Typography
            variant="h4"
            color="primary"
            sx={{
              mb: 3,
              fontWeight: 700
            }}
          >

            ${planta.precio}

          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 3,
              flexWrap: 'wrap'
            }}
          >

            <Chip
              label={`☀️ ${planta.tipoLuz}`}
              color="warning"
            />

            <Chip
              label={`💧 ${planta.riego}`}
              color="info"
            />

            <Chip
              label={
                planta.disponible
                  ? 'Disponible'
                  : 'Sin stock'
              }
              color={
                planta.disponible
                  ? 'success'
                  : 'error'
              }
            />

          </Stack>

          <Typography
            sx={{
              mb: 4,
              lineHeight: 1.8
            }}
          >

            {planta.descripcion}

          </Typography>

          <Button
            variant="contained"
            size="large"
            disabled={!planta.disponible}
            onClick={() =>
              agregarAlCarrito(planta)
            }
          >

            {planta.disponible
              ? 'Agregar al carrito'
              : 'No disponible'}

          </Button>

        </Box>

      </Box>

    </ClientLayout>

  )
}

export default DetallePlanta