import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton
} from '@mui/material'

import ShoppingCartIcon
  from '@mui/icons-material/ShoppingCart'

import LogoutIcon
  from '@mui/icons-material/Logout'

import ReceiptLongIcon
  from '@mui/icons-material/ReceiptLong'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import { useCart }
  from '../context/CartContext'

import {
  signOut
} from 'firebase/auth'

import {
  auth
} from '../firebase/config'

import MenuIcon
  from '@mui/icons-material/Menu'

import {
  onAuthStateChanged
} from 'firebase/auth'

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

function Navbar() {

  const navigate =
    useNavigate()

  const { carrito } =
    useCart()

  const [usuario,
    setUsuario] =
    useState(null)

  const [openMenu,
    setOpenMenu] =
    useState(false)

  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(

        auth,

        (user) => {

          setUsuario(user)

        }

      )

    return () =>

      unsubscribe()

  }, [])
  async function
    cerrarSesion() {

    await signOut(auth)

    navigate('/login')

  }

  return (

    <AppBar
      position="sticky"
      elevation={0}
      sx={{

        background:
          'rgba(255,255,255,0.92)',

        backdropFilter:
          'blur(12px)',

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

          minHeight: '78px'

        }}
      >

        <Typography
          variant="h5"
          sx={{

            fontWeight: 800,

            color: '#2e7d32',

            letterSpacing: 1,

            whiteSpace: 'nowrap',

            fontSize: {
              xs: '18px',
              md: '30px'
            }
          }}
        >

          🌿 Vivero
          Estanislaoo

        </Typography>

        <IconButton
          onClick={() =>
            setOpenMenu(true)
          }
          sx={{
            display: {
              xs: 'flex',
              md: 'none'
            }
          }}
        >

          <MenuIcon />

        </IconButton>

        {usuario && (

          <IconButton
            onClick={cerrarSesion}
            color="error"
            sx={{
              display: {
                xs: 'flex',
                md: 'none'
              }
            }}
          >

            <LogoutIcon />

          </IconButton>

        )}

        <Box
          sx={{

            display: {
              xs: 'none',
              md: 'flex'
            },

            gap: 2,

            alignItems: 'center',

            overflowX: 'auto',

            '&::-webkit-scrollbar': {
              display: 'none'
            }

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

          <IconButton
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

          </IconButton>

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

                  px: {
                    xs: 2,
                    md: 3
                  },

                  whiteSpace:
                    'nowrap',

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

                borderRadius: 3,

                whiteSpace:
                  'nowrap'

              }}
            >

              Salir

            </Button>

          )}

        </Box>

      </Toolbar>

      <Drawer
        anchor="right"
        open={openMenu}
        onClose={() =>
          setOpenMenu(false)
        }
      >

        <List sx={{ width: 250 }}>

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



          {usuario && (

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

          )}
          <ListItemButton
            component={Link}
            to="/carrito"
            onClick={() =>
              setOpenMenu(false)
            }
          >

            <ListItemText
              primary="Carrito"
            />

          </ListItemButton>

          {usuario?.email ===
            'luis12042003@gmail.com' && (

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

            )}

        </List>

      </Drawer>

    </AppBar>

  )

}

export default Navbar