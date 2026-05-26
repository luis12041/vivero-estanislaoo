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

import PersonIcon from '@mui/icons-material/Person'

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

import CloseIcon from '@mui/icons-material/Close'

import { Link } from 'react-router-dom'

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

  const { carrito } = useCart()

  const [usuario, setUsuario] = useState(null)

  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {

    const user = auth.currentUser

    setUsuario(user)

  }, [])

  async function cerrarSesion() {

    await signOut(auth)

    window.location.reload()

  }

  return (

    <>

      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          borderBottom: '1px solid #e0e0e0'
        }}
      >

        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#2e7d32'
            }}
          >

            Vivero Estanislaoo 🌱

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
              to="/"
              color="inherit"
            >

              Inicio

            </Button>

            <Button
              component={Link}
              to="/catalogo"
              color="inherit"
            >

              Catálogo

            </Button>

            <Button
              component={Link}
              to="/admin"
              variant="contained"
            >

              Admin

            </Button>

            {usuario && (

              <Button
                component={Link}
                to="/mis-pedidos"
                color="inherit"
                startIcon={<ReceiptLongIcon />}
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
                badgeContent={carrito.length}
                color="primary"
              >

                <ShoppingCartIcon />

              </Badge>

            </Button>

            {usuario ? (

              <>

                <Typography
                  sx={{
                    fontWeight: 600
                  }}
                >

                  {usuario.email}

                </Typography>

                <Button
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={cerrarSesion}
                >

                  Salir

                </Button>

              </>

            ) : (

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<PersonIcon />}
              >

                Login

              </Button>

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
            width: 280,
            p: 2
          }}
        >

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700
              }}
            >

              Menú 🌱

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
                to="/"
                onClick={() =>
                  setOpenMenu(false)
                }
              >

                <ListItemText
                  primary="Inicio"
                />

              </ListItemButton>

            </ListItem>

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

            {!usuario ? (

              <ListItem disablePadding>

                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={() =>
                    setOpenMenu(false)
                  }
                >

                  <ListItemText
                    primary="Login"
                  />

                </ListItemButton>

              </ListItem>

            ) : (

              <ListItem disablePadding>

                <ListItemButton
                  onClick={cerrarSesion}
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