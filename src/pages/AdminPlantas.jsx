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
  CircularProgress,
  Chip
} from '@mui/material'

import DeleteIcon
  from '@mui/icons-material/Delete'

import AddIcon
  from '@mui/icons-material/Add'

import Inventory2Icon
  from '@mui/icons-material/Inventory2'

import WarningAmberIcon
  from '@mui/icons-material/WarningAmber'

import CheckCircleIcon
  from '@mui/icons-material/CheckCircle'

import {
  inventario
} from '../data/inventario'

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
  eliminarPlanta,
  editarPlanta
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

  const [filtro, setFiltro] =
    useState('Todas')

  const [busqueda,
    setBusqueda] =
    useState('')

  const [openModal,
    setOpenModal] =
    useState(false)

  const [nombre, setNombre] =
    useState('')

  const [precio, setPrecio] =
    useState('')

  const [stock, setStock] =
    useState(50)

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

  const [modoEditar,
    setModoEditar] =
    useState(false)

  const [plantaEditando,
    setPlantaEditando] =
    useState(null)

  async function cargarPlantas() {

    const data =
      await obtenerPlantas()

    setPlantas(data)

  }

  useEffect(() => {

    cargarPlantas()

  }, [])

  async function handleEliminar(id) {

    if (
      !window.confirm(
        '¿Eliminar esta planta?'
      )
    ) return

    await eliminarPlanta(id)

    cargarPlantas()

  }

  async function guardarPlanta() {

    if (
      !nombre ||
      !precio ||
      !descripcion
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

      if (imagen) {

        imageUrl =
          await subirImagen(imagen)

      }

      if (modoEditar) {

        await editarPlanta(

          plantaEditando.id,

          {

            nombre,

            precio:
              Number(precio),

            stock:
              Number(stock),

            imagen:
              imageUrl ||
              plantaEditando.imagen,

            tipoLuz,

            riego,

            descripcion,

            disponible

          }

        )

      } else {

        await addDoc(
          collection(db, 'plantas'),
          {

            nombre,

            precio:
              Number(precio),

            stock:
              Number(stock),

            imagen:
              imageUrl,

            tipoLuz,

            riego,

            descripcion,

            disponible

          }
        )

      }

      setMensaje(

        modoEditar

          ? 'Planta actualizada ✏️'

          : 'Planta agregada 🌱'

      )

      setTipoAlert('success')

      setOpenAlert(true)

      setOpenModal(false)

      setNombre('')

      setPrecio('')

      setStock(50)

      setTipoLuz('Sol')

      setRiego('Moderado')

      setDescripcion('')

      setDisponible(true)

      setImagen(null)

      setModoEditar(false)

      setPlantaEditando(null)

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

  async function importarInventario() {

    console.log(inventario.length)

    if (
      !window.confirm(
        '¿Importar todo el inventario?'
      )
    ) return

    try {

      for (const planta of inventario) {

        try {

          await addDoc(
            collection(db, 'plantas'),
            {
              ...planta,
              disponible: true,
              casiAgotado:
                planta.stock <= 30
            }
          )

          console.log(
            '✅',
            planta.nombre
          )

        } catch (error) {

          console.log(
            '❌ ERROR EN:',
            planta.nombre
          )

          console.log(error)

        }

      }

      alert(
        'Inventario cargado 🌱'
      )

      cargarPlantas()

    } catch (error) {

      console.log(error)

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

              Administra inventario y stock del vivero

            </Typography>

          </Box>

          <Stack
            direction="row"
            spacing={2}
          >

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {

                setModoEditar(false)

                setPlantaEditando(null)

                setNombre('')

                setPrecio('')

                setStock(50)

                setTipoLuz('Sol')

                setRiego('Moderado')

                setDescripcion('')

                setDisponible(true)

                setImagen(null)

                setOpenModal(true)

              }}

              sx={{
                borderRadius: 4,
                py: 1.5,
                px: 3,
                backgroundColor:
                  '#2e7d32',
                fontWeight: 700,
                boxShadow:
                  '0 10px 20px rgba(46,125,50,0.25)'
              }}
            >

              Agregar Planta

            </Button>

            <Button
              variant="outlined"
              onClick={
                importarInventario
              }
              sx={{
                borderRadius: 4,
                py: 1.5,
                px: 3
              }}
            >

              Importar Inventario

            </Button>

          </Stack>

        </Stack>
        <TextField
          fullWidth
          label="Buscar planta por nombre"
          placeholder="Ej. Laurel"
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
          sx={{
            mb: 3
          }}
        />
        <Stack


          direction="row"
          spacing={2}
          flexWrap="wrap"
          sx={{ mb: 3 }}
        >

          <Button
            variant={
              filtro === 'Todas'
                ? 'contained'
                : 'outlined'
            }
            onClick={() =>
              setFiltro('Todas')
            }
          >
           🌿 Todas
          </Button>

          <Button
            variant={
              filtro === 'Sol'
                ? 'contained'
                : 'outlined'
            }
            onClick={() =>
              setFiltro('Sol')
            }
          >
            ☀️ Sol
          </Button>

          <Button
            variant={
              filtro === 'Sombra'
                ? 'contained'
                : 'outlined'
            }
            onClick={() =>
              setFiltro('Sombra')
            }
          >
            🌑 Sombra
          </Button>

          <Button
            variant={
              filtro === 'Resolana'
                ? 'contained'
                : 'outlined'
            }
            onClick={() =>
              setFiltro('Resolana')
            }
          >
            🌤️ Resolana
          </Button>

        </Stack>

        <Grid
          container
          spacing={3}
        >

          {plantas
            .filter(
              planta =>
                filtro === 'Todas'
                  ? true
                  : planta.tipoLuz === filtro
            )
            .filter(
              planta =>
                planta.nombre
                  ?.toLowerCase()
                  .includes(
                    busqueda.toLowerCase()
                  )
            )
            .map((planta) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={planta.id}
              >

                <Card
                  sx={{

                    height: '100%',

                    borderRadius: 5,

                    overflow: 'hidden',

                    background: '#fff',

                    border:
                      '1px solid #e8ecef',

                    boxShadow:
                      '0 8px 24px rgba(0,0,0,0.08)',

                    transition:
                      'all .25s ease',

                    display: 'flex',

                    flexDirection: 'column',

                    '&:hover': {

                      transform:
                        'translateY(-6px)',

                      boxShadow:
                        '0 14px 35px rgba(0,0,0,0.12)'

                    }

                  }}
                >

                  <CardMedia
                    component="img"
                    image={planta.imagen}
                    alt={planta.nombre}
                    sx={{

                      height: 220,

                      width: '100%',

                      objectFit: 'cover',

                      background:
                        '#f5f5f5'

                    }}
                  />

                  <CardContent>

                    <Stack spacing={2}>

                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 800,
                          color: '#1f2937'
                        }}
                      >

                        {planta.nombre}

                      </Typography>

                      <Typography
                        sx={{
                          color: '#6b7280',
                          fontSize: 14,
                          minHeight: 50
                        }}
                      >

                        {
                          planta.descripcion
                            ? `${planta.descripcion.slice(0, 60)}...`
                            : 'Sin descripción'
                        }

                      </Typography>
                      <Chip
                        label={planta.tipoLuz}
                        color={
                          planta.tipoLuz === 'Sol'
                            ? 'warning'
                            : planta.tipoLuz === 'Sombra'
                              ? 'info'
                              : 'success'
                        }
                        sx={{
                          width: 'fit-content',
                          alignSelf: 'flex-start',
                          fontWeight: 700
                        }}
                      />

                      <Typography
                        sx={{

                          fontSize: 28,

                          fontWeight: 900,

                          color: '#2e7d32'

                        }}
                      >

                        ${planta.precio}

                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          background: '#f3f4f6',
                          p: 1.5,
                          borderRadius: 3
                        }}
                      >

                        <Inventory2Icon
                          sx={{
                            color: '#555'
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

                      </Box>

                      {planta.stock <= 0 ? (

                        <Chip
                          icon={<DeleteIcon />}
                          label="Agotado"
                          color="error"
                          sx={{
                            width: 'fit-content',
                            alignSelf: 'flex-start',
                            fontWeight: 700
                          }}
                        />

                      ) : planta.stock <= 30 ? (

                        <Chip
                          icon={<WarningAmberIcon />}
                          label="Casi agotado"
                          color="warning"
                          sx={{
                            width: 'fit-content',
                            alignSelf: 'flex-start',
                            fontWeight: 700
                          }}
                        />

                      ) : (

                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Disponible"
                          color="success"
                          sx={{
                            width: 'fit-content',
                            alignSelf: 'flex-start',
                            fontWeight: 700
                          }}
                        />

                      )}
                      <Stack
                        direction="row"
                        spacing={1}
                      >

                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => {

                            setModoEditar(true)

                            setPlantaEditando(
                              planta
                            )

                            setImagen(null)

                            setNombre(
                              planta.nombre || ''
                            )

                            setPrecio(
                              planta.precio || ''
                            )

                            setStock(
                              planta.stock || 0
                            )

                            setTipoLuz(
                              planta.tipoLuz || 'Sol'
                            )

                            setRiego(
                              planta.riego || 'Moderado'
                            )

                            setDescripcion(
                              planta.descripcion || ''
                            )

                            setDisponible(
                              planta.disponible ?? true
                            )

                            setOpenModal(true)

                          }}
                          sx={{

                            borderRadius: 3,

                            py: 1,

                            fontWeight: 700,

                            background:
                              '#2e7d32',

                            '&:hover': {

                              background:
                                '#1b5e20'

                            }

                          }}
                        >

                          Editar

                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          startIcon={
                            <DeleteIcon />
                          }
                          onClick={() =>
                            handleEliminar(
                              planta.id
                            )
                          }
                          sx={{

                            borderRadius: 3,

                            py: 1,

                            fontWeight: 700

                          }}
                        >

                          Eliminar

                        </Button>

                      </Stack>
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
            fontWeight: 800
          }}
        >

          {
            modoEditar
              ? 'Editar Planta ✏️'
              : 'Agregar Planta 🌱'
          }

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
              label="Stock"
              type="number"
              fullWidth
              value={stock}
              onChange={(e) =>
                setStock(
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
            {
              modoEditar &&
              plantaEditando?.imagen && (

                <Box
                  component="img"
                  src={
                    plantaEditando.imagen
                  }
                  sx={{
                    width: '100%',
                    maxHeight: 250,
                    objectFit: 'cover',
                    borderRadius: 3
                  }}
                />

              )
            }
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderRadius: 3
              }}
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

              <Typography
                sx={{
                  fontWeight: 600
                }}
              >

                {imagen.name}

              </Typography>

            )}

            <Button
              variant="contained"
              size="large"
              onClick={guardarPlanta}
              disabled={loading}
              sx={{
                borderRadius: 4,
                py: 1.5,
                fontWeight: 700
              }}
            >

              {loading ? (

                <CircularProgress
                  size={24}
                  color="inherit"
                />

              ) : (

                modoEditar
                  ? 'Actualizar Planta'
                  : 'Guardar Planta'

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