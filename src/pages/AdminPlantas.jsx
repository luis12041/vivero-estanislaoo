import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material'

import DeleteIcon
from '@mui/icons-material/Delete'

import AddIcon
from '@mui/icons-material/Add'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  addDoc
} from 'firebase/firestore'

import {
  obtenerPlantas,
  eliminarPlanta
} from '../services/plantasService'

import {
  subirImagen
} from '../services/cloudinaryService'

import {
  db
} from '../firebase/config'

import AdminLayout from '../layouts/AdminLayout'

function AdminPlantas() {

  const [plantas, setPlantas] =
    useState([])

  const [openModal,
    setOpenModal] =
    useState(false)

  const [nombre, setNombre] =
    useState('')

  const [precio, setPrecio] =
    useState('')

  const [tipoLuz, setTipoLuz] =
    useState('Sol')

  const [riego, setRiego] =
    useState('Moderado')

  const [descripcion,
    setDescripcion] =
    useState('')

  const [disponible,
    setDisponible] =
    useState(true)

  const [imagen, setImagen] =
    useState(null)

  const [loading,
    setLoading] =
    useState(false)

  const [openAlert,
    setOpenAlert] =
    useState(false)

  const [mensaje,
    setMensaje] =
    useState('')

  const [tipoAlert,
    setTipoAlert] =
    useState('success')

  async function cargarPlantas() {

    const data =
      await obtenerPlantas()

    setPlantas(data)

  }

  useEffect(() => {

    cargarPlantas()

  }, [])

  async function handleEliminar(id) {

    await eliminarPlanta(id)

    cargarPlantas()

  }

  async function guardarPlanta() {

    if (
      !nombre ||
      !precio ||
      !descripcion ||
      !imagen
    ) {

      setMensaje(
        'Completa todos los campos 😅'
      )

      setTipoAlert('warning')

      setOpenAlert(true)

      return

    }

    try {

      setLoading(true)

      let imageUrl = ''

      imageUrl =
        await subirImagen(imagen)

      await addDoc(
        collection(db, 'plantas'),
        {

          nombre,

          precio:
            Number(precio),

          imagen:
            imageUrl,

          tipoLuz,

          riego,

          descripcion,

          disponible

        }
      )

      setMensaje(
        'Planta agregada 🌱'
      )

      setTipoAlert('success')

      setOpenAlert(true)

      setOpenModal(false)

      setNombre('')

      setPrecio('')

      setDescripcion('')

      setImagen(null)

      cargarPlantas()

    } catch (error) {

      console.log(error)

      setMensaje(
        'Error al guardar ❌'
      )

      setTipoAlert('error')

      setOpenAlert(true)

    } finally {

      setLoading(false)

    }

  }

  return (

    <AdminLayout>

      <Box>

        <Stack
          direction={{
            xs: 'column',
            md: 'row'
          }}
          justifyContent="space-between"
          alignItems={{
            xs: 'flex-start',
            md: 'center'
          }}
          spacing={3}
          sx={{
            mb: 5
          }}
        >

          <Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800
              }}
            >

              Administrar Plantas 🌱

            </Typography>

            <Typography
              sx={{
                color: '#666',
                mt: 1
              }}
            >

              Administra todas las
              plantas del vivero

            </Typography>

          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              setOpenModal(true)
            }
            sx={{

              borderRadius: 3,

              py: 1.5,

              px: 3,

              backgroundColor:
                '#2e7d32',

              fontWeight: 700

            }}
          >

            Agregar Planta

          </Button>

        </Stack>

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

                  borderRadius: 5,

                  overflow: 'hidden',

                  boxShadow:
                    '0 10px 25px rgba(0,0,0,0.08)',

                  transition: '0.3s',

                  '&:hover': {

                    transform:
                      'translateY(-5px)'

                  }

                }}
              >

                <CardMedia
                  component="img"
                  image={planta.imagen}
                  height="250"
                />

                <CardContent>

                  <Stack spacing={2}>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700
                      }}
                    >

                      {planta.nombre}

                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: '#2e7d32',
                        fontWeight: 700
                      }}
                    >

                      ${planta.precio}

                    </Typography>

                    <Button
                      variant="contained"
                      color="error"
                      startIcon={
                        <DeleteIcon />
                      }
                      onClick={() =>
                        handleEliminar(
                          planta.id
                        )
                      }
                      sx={{
                        borderRadius: 3
                      }}
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

      <Dialog
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        maxWidth="sm"
        fullWidth
      >

        <DialogTitle
          sx={{
            fontWeight: 700
          }}
        >

          Agregar Planta 🌱

        </DialogTitle>

        <DialogContent>

          <Stack
            spacing={3}
            sx={{
              mt: 2
            }}
          >

            <TextField
              label="Nombre"
              fullWidth
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
            />

            <TextField
              label="Precio"
              type="number"
              fullWidth
              value={precio}
              onChange={(e) =>
                setPrecio(
                  e.target.value
                )
              }
            />

            <TextField
              select
              label="Tipo de Luz"
              value={tipoLuz}
              onChange={(e) =>
                setTipoLuz(
                  e.target.value
                )
              }
              fullWidth
            >

              <MenuItem value="Sol">

                Sol

              </MenuItem>

              <MenuItem value="Sombra">

                Sombra

              </MenuItem>

              <MenuItem value="Resolana">

                Resolana

              </MenuItem>

            </TextField>

            <TextField
              select
              label="Riego"
              value={riego}
              onChange={(e) =>
                setRiego(
                  e.target.value
                )
              }
              fullWidth
            >

              <MenuItem value="Bajo">

                Bajo

              </MenuItem>

              <MenuItem value="Moderado">

                Moderado

              </MenuItem>

              <MenuItem value="Alto">

                Alto

              </MenuItem>

            </TextField>

            <TextField
              label="Descripción"
              multiline
              rows={4}
              fullWidth
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={disponible}
                  onChange={(e) =>
                    setDisponible(
                      e.target.checked
                    )
                  }
                />
              }
              label="Disponible"
            />

            <Button
              variant="outlined"
              component="label"
            >

              Seleccionar Imagen

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {

                  const file =
                    e.target.files[0]

                  if (!file) return

                  setImagen(file)

                }}
              />

            </Button>

            {imagen && (

              <Typography>

                {imagen.name}

              </Typography>

            )}

            <Button
              variant="contained"
              size="large"
              onClick={guardarPlanta}
              disabled={loading}
              sx={{
                borderRadius: 3
              }}
            >

              {loading ? (

                <CircularProgress
                  size={24}
                  color="inherit"
                />

              ) : (

                'Guardar Planta'

              )}

            </Button>

          </Stack>

        </DialogContent>

      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() =>
          setOpenAlert(false)
        }
      >

        <Alert
          severity={tipoAlert}
          variant="filled"
        >

          {mensaje}

        </Alert>

      </Snackbar>

    </AdminLayout>

  )

}

export default AdminPlantas