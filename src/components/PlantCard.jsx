import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack
} from '@mui/material'

import {
  useNavigate
} from 'react-router-dom'

import { useCart } from '../context/CartContext'

function PlantCard({
  id,
  nombre,
  precio,
  imagen,
  tipoLuz,
  riego,
  disponible
}) {

  const navigate = useNavigate()

  const { agregarAlCarrito } = useCart()

  const producto = {
    id,
    nombre,
    precio,
    imagen,
    tipoLuz,
    riego,
    disponible
  }

  return (

    <Card
      sx={{
        borderRadius: 5,
        boxShadow: 3,
        transition: '0.3s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >

      <CardMedia
        component="img"
        height="260"
        image={imagen}
        alt={nombre}
        sx={{
          cursor: 'pointer'
        }}
        onClick={() =>
          navigate(`/planta/${id}`)
        }
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >

        <Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              cursor: 'pointer'
            }}
            onClick={() =>
              navigate(`/planta/${id}`)
            }
          >

            {nombre}

          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              mb: 2,
              fontWeight: 700
            }}
          >

            ${precio}

          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{
              mb: 2
            }}
          >

            <Chip
              label={`☀️ ${tipoLuz}`}
              color="warning"
            />

            <Chip
              label={`💧 ${riego}`}
              color="info"
            />

          </Stack>

          <Typography
            sx={{
              mb: 2,
              fontWeight: 500,
              color: disponible
                ? 'green'
                : 'red'
            }}
          >

            {disponible
              ? 'Disponible'
              : 'No disponible'}

          </Typography>

        </Box>

        <Stack spacing={2}>

          <Button
            variant="outlined"
            fullWidth
            onClick={() =>
              navigate(`/planta/${id}`)
            }
          >

            Ver Detalles

          </Button>

          <Button
            variant="contained"
            fullWidth
            disabled={!disponible}
            onClick={() =>
              agregarAlCarrito(producto)
            }
          >

            {disponible
              ? 'Agregar al carrito'
              : 'Sin stock'}

          </Button>

        </Stack>

      </CardContent>

    </Card>

  )
}

export default PlantCard