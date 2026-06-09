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
  Paper,
  Chip
} from '@mui/material'

import Inventory2Icon
  from '@mui/icons-material/Inventory2'

import WarningAmberIcon
  from '@mui/icons-material/WarningAmber'

import ErrorIcon
  from '@mui/icons-material/Error'

import CheckCircleIcon
  from '@mui/icons-material/CheckCircle'

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

            fontWeight: 900,

            mb: 2,

            fontSize: {
              xs: '38px',
              md: '65px'
            },

            background:
              'linear-gradient(90deg,#1b5e20,#43a047)',

            WebkitBackgroundClip:
              'text',

            WebkitTextFillColor:
              'transparent'

          }}
        >

          Nuestro Catálogo 🌿

        </Typography>

        <Typography
          sx={{

            color: '#666',

            fontSize: '18px',

            maxWidth: 700,

            lineHeight: 1.8

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

          borderRadius: 6,

          mb: 5,

          background:
            'linear-gradient(145deg,#ffffff,#f7f7f7)',

          border:
            '1px solid #e0e0e0',

          boxShadow:
            '0 10px 25px rgba(0,0,0,0.05)'

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
            sx={{

              '& .MuiOutlinedInput-root': {

                borderRadius: 4

              }

            }}
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

                <Box
                  sx={{

                    background:
                      'linear-gradient(145deg,#ffffff,#f8f8f8)',

                    borderRadius: 6,

                    overflow: 'hidden',

                    boxShadow:
                      '0 10px 30px rgba(0,0,0,0.08)',

                    transition: '0.3s',

                    height: '100%',

                    '&:hover': {

                      transform:
                        'translateY(-8px)',

                      boxShadow:
                        '0 20px 40px rgba(0,0,0,0.12)'

                    }

                  }}
                >

                  <PlantCard
                    id={planta.id}
                    nombre={planta.nombre}
                    precio={planta.precio}
                    imagen={planta.imagen}
                    tipoLuz={planta.tipoLuz}
                    riego={planta.riego}
                    disponible={planta.disponible}
                    descripcion={planta.descripcion}
                    stock={planta.stock}
                  />

                  <Box
                    sx={{
                      px: 3,
                      pb: 3
                    }}
                  >

                    <Stack
                      spacing={2}
                    >

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >

                        <Inventory2Icon
                          sx={{
                            color:
                              '#2e7d32'
                          }}
                        />

                        <Typography
                          sx={{
                            fontWeight: 700
                          }}
                        >

                          Stock:
                          {' '}
                          {planta.stock || 0}

                        </Typography>

                      </Stack>

                      {planta.stock <= 0 ? (

                        <Chip
                          icon={<ErrorIcon />}
                          label="Agotado"
                          color="error"
                          sx={{
                            width:
                              'fit-content',
                            fontWeight: 700,
                            borderRadius: 3
                          }}
                        />

                      ) : planta.stock <= 30 ? (

                        <Chip
                          icon={
                            <WarningAmberIcon />
                          }
                          label="Casi agotado"
                          color="warning"
                          sx={{
                            width:
                              'fit-content',
                            fontWeight: 700,
                            borderRadius: 3
                          }}
                        />

                      ) : (

                        <Chip
                          icon={
                            <CheckCircleIcon />
                          }
                          label="Disponible"
                          color="success"
                          sx={{
                            width:
                              'fit-content',
                            fontWeight: 700,
                            borderRadius: 3
                          }}
                        />

                      )}

                    </Stack>

                  </Box>

                </Box>

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