import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import ClientLayout from '../layouts/ClientLayout'

import PlantCard from '../components/PlantCard'

import { obtenerPlantas } from '../services/plantasService'

function Catalogo() {

  const [plantas, setPlantas] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [filtroLuz, setFiltroLuz] =
    useState('Todas')

  const [busqueda, setBusqueda] =
    useState('')

  const [soloDisponibles,
    setSoloDisponibles] =
    useState(false)

  useEffect(() => {

    async function cargarPlantas() {

      const data =
        await obtenerPlantas()

      setPlantas(data)

      setLoading(false)

    }

    cargarPlantas()

  }, [])

  const plantasFiltradas =
    plantas.filter((planta) => {

      const coincideLuz =

        filtroLuz === 'Todas'
          ? true
          : planta.tipoLuz ===
            filtroLuz

      const coincideBusqueda =

        planta.nombre
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

      const coincideDisponibilidad =

        soloDisponibles
          ? planta.disponible
          : true

      return (

        coincideLuz
        &&
        coincideBusqueda
        &&
        coincideDisponibilidad

      )

    })

  return (

    <ClientLayout>

      <Box
        sx={{
          mb: 6
        }}
      >

        <Typography
          variant="h2"
          sx={{

            fontWeight: 800,

            mb: 2,

            fontSize: {
              xs: '42px',
              md: '65px'
            }

          }}
        >

          Nuestro Catálogo 🌿

        </Typography>

        <Typography
          sx={{

            color: '#666',

            fontSize: '18px',

            maxWidth: 700

          }}
        >

          Descubre plantas
          increíbles para llenar
          tus espacios de vida 🌱

        </Typography>

      </Box>

      <Paper
        elevation={0}
        sx={{

          p: 3,

          borderRadius: 5,

          mb: 5,

          border:
            '1px solid #e0e0e0'

        }}
      >

        <Stack spacing={3}>

          <TextField
            label="Buscar planta 🌱"
            fullWidth
            value={busqueda}
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
          />

          <Stack
            direction={{
              xs: 'column',
              md: 'row'
            }}
            spacing={3}
            alignItems={{
              xs: 'flex-start',
              md: 'center'
            }}
          >

            <ToggleButtonGroup
              value={filtroLuz}
              exclusive
              onChange={(
                event,
                nuevoFiltro
              ) => {

                if (
                  nuevoFiltro !==
                  null
                ) {

                  setFiltroLuz(
                    nuevoFiltro
                  )

                }

              }}
              sx={{

                flexWrap: 'wrap',

                gap: 1

              }}
            >

              <ToggleButton
                value="Todas"
              >

                Todas

              </ToggleButton>

              <ToggleButton
                value="Sol"
              >

                ☀️ Sol

              </ToggleButton>

              <ToggleButton
                value="Sombra"
              >

                🌑 Sombra

              </ToggleButton>

              <ToggleButton
                value="Resolana"
              >

                🌤️ Resolana

              </ToggleButton>

            </ToggleButtonGroup>

            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    soloDisponibles
                  }
                  onChange={(e) =>
                    setSoloDisponibles(
                      e.target.checked
                    )
                  }
                />
              }
              label="Solo disponibles"
            />

          </Stack>

        </Stack>

      </Paper>

      {loading ? (

        <Box
          sx={{

            display: 'flex',

            justifyContent:
              'center',

            mt: 10

          }}
        >

          <CircularProgress />

        </Box>

      ) : (

        <Grid
          container
          spacing={4}
        >

          {plantasFiltradas.map(
            (planta) => (

              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={planta.id}
              >

                <PlantCard
                  id={planta.id}
                  nombre={
                    planta.nombre
                  }
                  precio={
                    planta.precio
                  }
                  imagen={
                    planta.imagen
                  }
                  tipoLuz={
                    planta.tipoLuz
                  }
                  riego={
                    planta.riego
                  }
                  disponible={
                    planta.disponible
                  }
                  descripcion={
                    planta.descripcion
                  }
                />

              </Grid>

            )
          )}

        </Grid>

      )}

      {!loading
        &&
        plantasFiltradas.length ===
          0 && (

          <Typography
            variant="h5"
            sx={{

              textAlign:
                'center',

              mt: 10,

              color: 'gray'

            }}
          >

            No se encontraron
            plantas 😢

          </Typography>

        )}

    </ClientLayout>

  )

}

export default Catalogo