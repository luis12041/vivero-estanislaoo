import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  MenuItem,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material'

import {
  useState
} from 'react'

import {
  collection,
  addDoc
} from 'firebase/firestore'

import { db } from '../firebase/config'

import { subirImagen } from '../services/cloudinaryService'

import AdminLayout from '../layouts/AdminLayout'

function AgregarPlanta() {

  const [nombre, setNombre] = useState('')

  const [precio, setPrecio] = useState('')

  const [tipoLuz, setTipoLuz] = useState('Sol')

  const [riego, setRiego] = useState('Moderado')

  const [descripcion, setDescripcion] = useState('')

  const [disponible, setDisponible] = useState(true)

  const [imagen, setImagen] = useState(null)

  const [loading, setLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)

  const [mensaje, setMensaje] = useState('')

  const [tipoAlert, setTipoAlert] = useState('success')

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

      if (imagen) {

        imageUrl = await subirImagen(imagen)

      }

      await addDoc(collection(db, 'plantas'), {

        nombre,

        precio: Number(precio),

        imagen: imageUrl,

        tipoLuz,

        riego,

        descripcion,

        disponible

      })

      setMensaje(
        'Planta agregada correctamente 🌱'
      )

      setTipoAlert('success')

      setOpenAlert(true)

      setNombre('')

      setPrecio('')

      setTipoLuz('Sol')

      setRiego('Moderado')

      setDescripcion('')

      setDisponible(true)

      setImagen(null)

    } catch (error) {

      console.log(error)

      setMensaje(
        'Error al guardar planta ❌'
      )

      setTipoAlert('error')

      setOpenAlert(true)

    } finally {

      setLoading(false)

    }
  }

  return (

    <AdminLayout>

      <Box
        sx={{
          maxWidth: 500,
          mx: 'auto',
          mt: 5
        }}
      >

        <Typography
          variant="h3"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 700
          }}
        >

          Agregar Planta 🌱

        </Typography>

        <Stack spacing={3}>

          <TextField
            label="Nombre"
            fullWidth
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
          />

          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={precio}
            onChange={(e) =>
              setPrecio(e.target.value)
            }
          />

          <TextField
            select
            label="Tipo de Luz"
            value={tipoLuz}
            onChange={(e) =>
              setTipoLuz(e.target.value)
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
            label="Tipo de Riego"
            value={riego}
            onChange={(e) =>
              setRiego(e.target.value)
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
              setDescripcion(e.target.value)
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={disponible}
                onChange={(e) =>
                  setDisponible(e.target.checked)
                }
              />
            }
            label="Disponible"
          />

          <Button
            variant="outlined"
            component="label"
            size="large"
          >

            Seleccionar Imagen

            <input
              hidden
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => {

                const file = e.target.files[0]

                if (!file) return

                setImagen(file)

              }}
            />

          </Button>

          {imagen && (

            <Typography
              sx={{
                color: 'gray',
                fontSize: '14px',
                textAlign: 'center'
              }}
            >

              Imagen seleccionada:
              {' '}
              {imagen.name}

            </Typography>

          )}

          <Button
            variant="contained"
            size="large"
            onClick={guardarPlanta}
            disabled={loading}
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

      </Box>

    </AdminLayout>

  )
}

export default AgregarPlanta