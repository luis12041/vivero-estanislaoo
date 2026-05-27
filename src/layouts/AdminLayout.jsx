import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  ListItemIcon,
  Avatar,
  Divider
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import GrassIcon from '@mui/icons-material/Grass'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import GroupIcon from '@mui/icons-material/Group'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

import { signOut } from 'firebase/auth'

import { auth } from '../firebase/config'

import { useState } from 'react'

const drawerWidth = 210

function AdminLayout({ children }) {

  const navigate = useNavigate()

  const location = useLocation()

  const [mobileOpen,
    setMobileOpen] =
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
      text: 'Plantas',
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
          'linear-gradient(180deg,#0f3d1c,#1b5e20)',

        color: 'white'

      }}
    >

      <Box
        sx={{
          px: 2.5,
          py: 3
        }}
      >

        <Typography
          sx={{
            fontSize: {
              xs: 24,
              md: 30
            },

            fontWeight: 900
          }}
        >

          🌱 Vivero

        </Typography>

        <Typography
          sx={{
            opacity: 0.7,
            fontSize: 13
          }}
        >

          Panel administrativo

        </Typography>

      </Box>

      <Divider
        sx={{
          borderColor:
            'rgba(255,255,255,0.08)'
        }}
      />

      <List
        sx={{
          mt: 1,
          px: 1.5
        }}
      >

        {menuItems.map((item) => (

          <ListItemButton

            key={item.text}

            component={Link}

            to={item.path}

            sx={{

              mb: 1,

              borderRadius: 3,

              py: 1.2,

              backgroundColor:

                location.pathname === item.path

                  ? 'rgba(255,255,255,0.12)'

                  : 'transparent',

              '&:hover': {

                backgroundColor:
                  'rgba(255,255,255,0.08)'

              }

            }}
          >

            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: 36
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
          p: 1.5
        }}
      >

        <Box
          sx={{

            p: 1.5,

            mb: 1.5,

            borderRadius: 3,

            background:
              'rgba(255,255,255,0.08)'

          }}
        >

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >

            <Avatar
              sx={{
                width: 42,
                height: 42,
                background:
                  '#43a047'
              }}
            >

              A

            </Avatar>

            <Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 15
                }}
              >

                Admin

              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  opacity: 0.7
                }}
              >

                Administrador

              </Typography>

            </Box>

          </Box>

        </Box>

        <ListItemButton
          onClick={cerrarSesion}
          sx={{

            borderRadius: 3,

            py: 1.2,

            background:
              '#e53935',

            '&:hover': {

              background:
                '#c62828'

            }

          }}
        >

          <ListItemIcon
            sx={{
              color: 'white',
              minWidth: 36
            }}
          >

            <LogoutIcon />

          </ListItemIcon>

          <ListItemText
            primary="Cerrar sesión"
          />

        </ListItemButton>

      </Box>

    </Box>

  )

  return (

    <Box
      sx={{
        display: 'flex',
        background:
          '#f4f6f8',
        minHeight: '100vh'
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

          zIndex: 3000
        }}
      >

        <IconButton
          onClick={() =>
            setMobileOpen(true)
          }
          sx={{
            background:
              'white',

            boxShadow:
              '0 4px 12px rgba(0,0,0,0.10)'
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

            width: drawerWidth,

            border: 'none'

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

            boxSizing:
              'border-box'

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
            xs: 1.5,
            md: 3
          }
        }}
      >

        {children}

      </Box>

    </Box>

  )

}

export default AdminLayout