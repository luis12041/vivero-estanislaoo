import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Stack
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

import {
  useEffect,
  useState
} from 'react'

import {
  obtenerPlantas,
  eliminarPlanta
} from '../services/plantasService'

import AdminLayout from '../layouts/AdminLayout'

function AdminPlantas() {

  const [plantas, setPlantas] = useState([])

  async function cargarPlantas() {

    const data = await obtenerPlantas()

    setPlantas(data)

  }

  useEffect(() => {

    cargarPlantas()

  }, [])

  async function handleEliminar(id) {

    await eliminarPlanta(id)

    cargarPlantas()

  }

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

          Administrar Plantas 🌱

        </Typography>

        <Grid
          container
          spacing={4}
        >

          {plantas.map((planta) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={planta.id}
            >

              <Card
                sx={{
                  borderRadius: 5
                }}
              >

                <CardMedia
                  component="img"
                  image={planta.imagen}
                  height="250"
                />

                <CardContent>

                  <Stack spacing={2}>

                    <Typography variant="h5">

                      {planta.nombre}

                    </Typography>

                    <Typography
                      variant="h6"
                      color="primary"
                    >

                      ${planta.precio}

                    </Typography>

                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        handleEliminar(planta.id)
                      }
                    >

                      Eliminar

                    </Button>

                  </Stack>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </AdminLayout>

  )
}

export default AdminPlantas