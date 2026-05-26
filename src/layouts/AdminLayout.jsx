import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
  IconButton
} from '@mui/material'

import DashboardIcon
from '@mui/icons-material/Dashboard'

import GrassIcon
from '@mui/icons-material/Grass'

import AddIcon
from '@mui/icons-material/Add'

import LogoutIcon
from '@mui/icons-material/Logout'

import StorefrontIcon
from '@mui/icons-material/Storefront'

import MenuIcon
from '@mui/icons-material/Menu'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  signOut
} from 'firebase/auth'

import {
  auth
} from '../firebase/config'

import {
  useState
} from 'react'

const drawerWidth = 260

function AdminLayout({ children }) {

  const navigate = useNavigate()

  const [mobileOpen,
    setMobileOpen] =
    useState(false)

  async function cerrarSesion() {

    await signOut(auth)

    navigate('/login')

  }

  const drawer = (

    <Box
      sx={{
        height: '100%',
        background:
          'linear-gradient(180deg,#1b5e20,#2e7d32)',
        color: 'white'
      }}
    >

      <Toolbar>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800
          }}
        >

          🌱 Admin

        </Typography>

      </Toolbar>

      <Divider
        sx={{
          borderColor:
            'rgba(255,255,255,0.2)'
        }}
      />

      <List
        sx={{
          mt: 2
        }}
      >

        <ListItemButton
          component={Link}
          to="/admin"
          sx={{
            borderRadius: 3,
            mx: 2,
            mb: 1
          }}
        >

          <DashboardIcon
            sx={{ mr: 2 }}
          />

          <ListItemText
            primary="Dashboard"
          />

        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin-plantas"
          sx={{
            borderRadius: 3,
            mx: 2,
            mb: 1
          }}
        >

          <GrassIcon
            sx={{ mr: 2 }}
          />

          <ListItemText
            primary="Administrar plantas"
          />

        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/catalogo"
          sx={{
            borderRadius: 3,
            mx: 2,
            mb: 1
          }}
        >

          <StorefrontIcon
            sx={{ mr: 2 }}
          />

          <ListItemText
            primary="Ver catálogo"
          />

        </ListItemButton>

      </List>

      <Box
        sx={{
          p: 2,
          mt: 'auto'
        }}
      >

        <Button
          fullWidth
          color="error"
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={cerrarSesion}
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 700
          }}
        >

          Cerrar sesión

        </Button>

      </Box>

    </Box>

  )

  return (

    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor:
          '#f4f6f8'
      }}
    >

      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none'
          },
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 2000
        }}
      >

        <IconButton
          onClick={() =>
            setMobileOpen(true)
          }
          sx={{
            backgroundColor: 'white'
          }}
        >

          <MenuIcon />

        </IconButton>

      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
        sx={{
          display: {
            xs: 'block',
            md: 'none'
          },

          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
      >

        {drawer}

      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          },

          width: drawerWidth,

          flexShrink: 0,

          '& .MuiDrawer-paper': {

            width: drawerWidth,

            boxSizing:
              'border-box',

            border: 'none'

          }
        }}
      >

        {drawer}

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: {
            xs: 2,
            md: 4
          }
        }}
      >

        {children}

      </Box>

    </Box>

  )

}

export default AdminLayout