import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Paper
} from '@mui/material'

import {
  useState
} from 'react'

import {
  createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  auth
} from '../firebase/config'

import {
  useNavigate
} from 'react-router-dom'

import ClientLayout from '../layouts/ClientLayout'

function Register() {

  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function registrarUsuario() {

    try {

      setLoading(true)

      await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      )

      alert('Cuenta creada 😎🌱')

      navigate('/')

    } catch (error) {

      console.log(error)

      alert('Error al registrar usuario')

    } finally {

      setLoading(false)

    }
  }

  return (

    <ClientLayout>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh'
        }}
      >

        <Paper
          elevation={4}
          sx={{
            p: 5,
            width: '100%',
            maxWidth: 450,
            borderRadius: 5
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

            Crear Cuenta 🌱

          </Typography>

          <Stack spacing={3}>

            <TextField
              label="Correo"
              type="email"
              fullWidth
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <Button
              variant="contained"
              size="large"
              onClick={registrarUsuario}
              disabled={loading}
            >

              {loading
                ? 'Creando cuenta...'
                : 'Registrarse'}

            </Button>

          </Stack>

        </Paper>

      </Box>

    </ClientLayout>

  )
}

export default Register