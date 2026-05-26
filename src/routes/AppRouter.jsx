import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

import {
  useState
} from 'react'

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material'

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

  const [mostrarPassword, setMostrarPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [openReset, setOpenReset] = useState(false)

  const [correoReset, setCorreoReset] = useState('')

  async function iniciarSesion() {

    try {

      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        correo,
        password
      )

      alert('Bienvenido 😎🌱')

      navigate('/home')

    } catch (error) {

      console.log(error)

      alert('Correo o contraseña incorrectos')

    } finally {

      setLoading(false)

    }

  }

  async function recuperarPassword() {

    try {

      await sendPasswordResetEmail(
        auth,
        correoReset
      )

      alert(
        'Te enviamos un correo para recuperar tu contraseña 📩'
      )

      setOpenReset(false)

      setCorreoReset('')

    } catch (error) {

      console.log(error)

      alert('Error al enviar correo')

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

        position: 'relative',

        px: 2

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
            variant="h4"
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
            type={
              mostrarPassword
                ? 'text'
                : 'password'
            }
            fullWidth
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            InputProps={{

              endAdornment: (

                <InputAdornment position="end">

                  <IconButton
                    onClick={() =>
                      setMostrarPassword(
                        !mostrarPassword
                      )
                    }
                  >

                    {mostrarPassword
                      ? <VisibilityOff />
                      : <Visibility />}

                  </IconButton>

                </InputAdornment>

              )

            }}
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

                fontWeight: 700,

                fontSize: '16px'

              }}
            >

              Crear cuenta nueva

            </Typography>

            <Typography
              onClick={() =>
                setOpenReset(true)
              }
              sx={{

                color: '#2e7d32',

                fontWeight: 600,

                cursor: 'pointer',

                '&:hover': {

                  textDecoration:
                    'underline'

                }

              }}
            >

              ¿Olvidaste tu contraseña?

            </Typography>

          </Stack>

        </Stack>

      </Paper>

      <Dialog
        open={openReset}
        onClose={() =>
          setOpenReset(false)
        }
      >

        <DialogTitle>

          Recuperar contraseña 🔑

        </DialogTitle>

        <DialogContent>

          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            sx={{
              mt: 2
            }}
            value={correoReset}
            onChange={(e) =>
              setCorreoReset(
                e.target.value
              )
            }
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenReset(false)
            }
          >

            Cancelar

          </Button>

          <Button
            variant="contained"
            onClick={
              recuperarPassword
            }
          >

            Enviar

          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  )

}

export default Login