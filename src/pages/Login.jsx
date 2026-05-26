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
  signInWithEmailAndPassword
} from 'firebase/auth'

import {
  auth
} from '../firebase/config'

import {
  useNavigate,
  Link
} from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function iniciarSesion() {

    try {

      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        correo,
        password
      )

      alert('Bienvenido 😎🌱')

      navigate('/')

    } catch (error) {

      console.log(error)

      alert('Correo o contraseña incorrectos')

    } finally {

      setLoading(false)

    }

  }

  return (

    <Box
      sx={{

        minHeight: '100vh',

        backgroundImage:
          'url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1974&auto=format&fit=crop)',

        backgroundSize: 'cover',

        backgroundPosition: 'center',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        position: 'relative'

      }}
    >

      <Box
        sx={{

          position: 'absolute',

          inset: 0,

          background:
            'rgba(0,0,0,0.45)',

          backdropFilter: 'blur(3px)'

        }}
      />

      <Paper
        elevation={10}
        sx={{

          position: 'relative',

          zIndex: 2,

          width: '100%',

          maxWidth: 430,

          p: 5,

          borderRadius: 6,

          background:
            'rgba(255,255,255,0.92)',

          backdropFilter: 'blur(10px)'

        }}
      >

        <Stack spacing={3}>

          <Box
            sx={{
              textAlign: 'center'
            }}
          >

            <Typography
              variant="h3"
              sx={{

                fontWeight: 800,

                color: '#2e7d32',

                mb: 1

              }}
            >

              🌿 Viveros
              Estanislao

            </Typography>

            <Typography
              sx={{
                color: '#666'
              }}
            >

              Plantas para interior y exterior

            </Typography>

          </Box>

          <Typography
            variant="h3"
            sx={{

              textAlign: 'center',

              fontWeight: 700

            }}
          >

            Iniciar Sesión

          </Typography>

          <TextField
            label="Correo electrónico"
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
            onClick={iniciarSesion}
            disabled={loading}
            sx={{

              py: 1.5,

              borderRadius: 3,

              fontWeight: 700,

              fontSize: '18px',

              backgroundColor: '#2e7d32',

              '&:hover': {

                backgroundColor: '#1b5e20'

              }

            }}
          >

            {loading
              ? 'Ingresando...'
              : 'Entrar'}

          </Button>

          <Stack
            spacing={2}
            sx={{
              textAlign: 'center'
            }}
          >

            <Typography
              component={Link}
              to="/register"
              sx={{

                textDecoration: 'none',

                color: '#2e7d32',

                fontWeight: 700

              }}
            >

              Crear cuenta nueva

            </Typography>

            <Typography
              sx={{

                color: '#2e7d32',

                fontWeight: 600,

                cursor: 'pointer'

              }}
            >

              Olvidé mi contraseña

            </Typography>

          </Stack>

        </Stack>

      </Paper>

    </Box>

  )

}

export default Login