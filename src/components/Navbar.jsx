import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import LogoutIcon from '@mui/icons-material/Logout'

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

import CloseIcon from '@mui/icons-material/Close'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import { useCart } from '../context/CartContext'

import {
  signOut
} from 'firebase/auth'

import {
  auth
} from '../firebase/config'

import {
  useEffect,
  useState
} from 'react'

function Navbar() {

  const navigate = useNavigate()

  const { carrito } = useCart()

  const [usuario, setUsuario] =
    useState(null)

  const [openMenu, setOpenMenu] =
    useState(false)

  useEffect(() => {

    const user = auth.currentUser

    setUsuario(user)

  }, [])

  async function cerrarSesion() {

    await signOut(auth)

    navigate('/login')

  }

  return (

    <>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{

          background:
            'rgba(255,255,255,0.9)',

          backdropFilter: 'blur(10px)',

          color: 'black',

          borderBottom:
            '1px solid #e0e0e0'

        }}
      >

        <Toolbar
          sx={{

            display: 'flex',

            justifyContent:
              'space-between',

            minHeight: '80px'

          }}
        >

          <Typography
            variant="h5"
            sx={{

              fontWeight: 800,

              color: '#2e7d32',

              letterSpacing: 1

            }}
          >

            🌿 Vivero
            Estanislaoo

          </Typography>

          <Box
            sx={{

              display: {
                xs: 'none',
                md: 'flex'
              },

              gap: 2,

              alignItems: 'center'

            }}
          >

            <Button
              component={Link}
              to="/catalogo"
              color="inherit"
              sx={{
                fontWeight: 700
              }}
            >

              Catálogo

            </Button>

            {usuario && (

              <Button
                component={Link}
                to="/mis-pedidos"
                color="inherit"
                startIcon={
                  <ReceiptLongIcon />
                }
                sx={{
                  fontWeight: 700
                }}
              >

                Mis pedidos

              </Button>

            )}

            <Button
              component={Link}
              to="/carrito"
              color="inherit"
            >

              <Badge
                badgeContent={
                  carrito.length
                }
                color="success"
              >

                <ShoppingCartIcon />

              </Badge>

            </Button>

            {usuario?.email ===
              'luis12042003@gmail.com' && (

              <Button
                component={Link}
                to="/admin"
                variant="contained"
                sx={{

                  borderRadius: 3,

                  backgroundColor:
                    '#2e7d32',

                  fontWeight: 700,

                  px: 3,

                  '&:hover': {

                    backgroundColor:
                      '#1b5e20'

                  }

                }}
              >

                Admin

              </Button>

            )}

            {usuario && (

              <>

                <Typography
                  sx={{

                    fontWeight: 600,

                    color: '#555'

                  }}
                >

                  {usuario.email}

                </Typography>

                <Button
                  color="error"
                  variant="outlined"
                  startIcon={
                    <LogoutIcon />
                  }
                  onClick={
                    cerrarSesion
                  }
                  sx={{
                    borderRadius: 3
                  }}
                >

                  Salir

                </Button>

              </>

            )}

          </Box>

          <IconButton
            sx={{
              display: {
                xs: 'flex',
                md: 'none'
              }
            }}
            onClick={() =>
              setOpenMenu(true)
            }
          >

            <MenuIcon />

          </IconButton>

        </Toolbar>

      </AppBar>

      <Drawer
        anchor="right"
        open={openMenu}
        onClose={() =>
          setOpenMenu(false)
        }
      >

        <Box
          sx={{
            width: 300,
            p: 3
          }}
        >

          <Box
            sx={{

              display: 'flex',

              justifyContent:
                'space-between',

              alignItems: 'center',

              mb: 4

            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700
              }}
            >

              🌱 Menú

            </Typography>

            <IconButton
              onClick={() =>
                setOpenMenu(false)
              }
            >

              <CloseIcon />

            </IconButton>

          </Box>

          <List>

            <ListItem disablePadding>

              <ListItemButton
                component={Link}
                to="/catalogo"
                onClick={() =>
                  setOpenMenu(false)
                }
              >

                <ListItemText
                  primary="Catálogo"
                />

              </ListItemButton>

            </ListItem>

            <ListItem disablePadding>

              <ListItemButton
                component={Link}
                to="/carrito"
                onClick={() =>
                  setOpenMenu(false)
                }
              >

                <ListItemText
                  primary={`Carrito (${carrito.length})`}
                />

              </ListItemButton>

            </ListItem>

            {usuario && (

              <ListItem disablePadding>

                <ListItemButton
                  component={Link}
                  to="/mis-pedidos"
                  onClick={() =>
                    setOpenMenu(false)
                  }
                >

                  <ListItemText
                    primary="Mis pedidos"
                  />

                </ListItemButton>

              </ListItem>

            )}

            {usuario?.email ===
              'luis12042003@gmail.com' && (

              <ListItem disablePadding>

                <ListItemButton
                  component={Link}
                  to="/admin"
                  onClick={() =>
                    setOpenMenu(false)
                  }
                >

                  <ListItemText
                    primary="Admin"
                  />

                </ListItemButton>

              </ListItem>

            )}

            {usuario && (

              <ListItem disablePadding>

                <ListItemButton
                  onClick={
                    cerrarSesion
                  }
                >

                  <ListItemText
                    primary="Cerrar sesión"
                  />

                </ListItemButton>

              </ListItem>

            )}

          </List>

        </Box>

      </Drawer>

    </>

  )

}

export default Navbar