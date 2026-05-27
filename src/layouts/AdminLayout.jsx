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
  IconButton,
  ListItemIcon
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import GrassIcon from '@mui/icons-material/Grass'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import GroupIcon from '@mui/icons-material/Group'

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useState } from 'react'

const drawerWidth = 270

function AdminLayout({ children }) {

  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] =
    useState(false)

  async function cerrarSesion() {

    await signOut(auth)

    navigate('/login')

  }

  const menuItems = [

    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin'
    },

    {
      text: 'Administrar plantas',
      icon: <GrassIcon />,
      path: '/admin-plantas'
    },

    {
      text: 'Pedidos',
      icon: <ShoppingBagIcon />,
      path: '/admin-pedidos'
    },

    {
      text: 'Usuarios',
      icon: <GroupIcon />,
      path: '/admin-usuarios'
    }

  ]

  const drawer = (

    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(180deg,#1b5e20,#2e7d32)',
        color: 'white'
      }}
    >

      <Toolbar>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900
          }}
        >

          🌱 Admin

        </Typography>

      </Toolbar>

      <Divider
        sx={{
          borderColor:
            'rgba(255,255,255,0.15)'
        }}
      />

      <List sx={{ mt: 2 }}>

        {menuItems.map((item) => (

          <ListItemButton

            key={item.text}

            component={Link}

            to={item.path}

            sx={{

              mx: 2,

              mb: 1,

              borderRadius: 4,

              py: 1.5,

              backgroundColor:

                location.pathname === item.path

                  ? 'rgba(255,255,255,0.15)'

                  : 'transparent',

              '&:hover': {

                backgroundColor:
                  'rgba(255,255,255,0.12)'

              }

            }}
          >

            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: 40
              }}
            >

              {item.icon}

            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />

          </ListItemButton>

        ))}

      </List>

      <Box
        sx={{
          mt: 'auto',
          p: 2
        }}
      >

        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={cerrarSesion}
          sx={{
            borderRadius: 4,
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
        backgroundColor: '#f4f6f8'
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

            border: 'none',

            boxSizing: 'border-box'

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