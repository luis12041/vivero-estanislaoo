import {
  Box,
  TextField,
  Typography,
  Button,
  Stack
} from '@mui/material'

import {
  useState,
  useEffect
} from 'react'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import {
  doc,
  getDoc
} from 'firebase/firestore'

import { db } from '../firebase/config'

import {
  editarPlanta
} from '../services/plantasService'

import AdminLayout from '../layouts/AdminLayout'

function EditarPlanta() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')

  const [precio, setPrecio] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    async function cargarPlanta() {

      const plantaRef = doc(db, 'plantas', id)

      const snapshot = await getDoc(plantaRef)

      if (snapshot.exists()) {

        const data = snapshot.data()

        setNombre(data.nombre)

        setPrecio(data.precio)

      }

    }

    cargarPlanta()

  }, [id])

  async function handleEditar() {

    try {

      setLoading(true)

      await editarPlanta(id, {

        nombre,

        precio: Number(precio)

      })

      alert('Planta actualizada 😎🌱')

      navigate('/admin-plantas')

    } catch (error) {

      console.log(error)

      alert('Error al actualizar')

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

          Editar Planta ✏️

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

          <Button
            variant="contained"
            size="large"
            onClick={handleEditar}
            disabled={loading}
          >

            {loading
              ? 'Actualizando...'
              : 'Guardar Cambios'}

          </Button>

        </Stack>

      </Box>

    </AdminLayout>

  )
}

export default EditarPlanta