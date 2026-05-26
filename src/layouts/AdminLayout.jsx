import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'

import {
  Link
} from 'react-router-dom'

const drawerWidth = 240

function AdminLayout({ children }) {

  return (

    <Box sx={{ display: 'flex' }}>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >

        <Toolbar>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'primary.main'
            }}
          >

            Admin 🌱

          </Typography>

        </Toolbar>

        <List>

          <ListItemButton
            component={Link}
            to="/agregar-planta"
          >

            <ListItemText
              primary="Agregar Planta"
            />

          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/admin-plantas"
          >

            <ListItemText
              primary="Administrar Plantas"
            />

          </ListItemButton>

        </List>

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4
        }}
      >

        {children}

      </Box>

    </Box>

  )
}

export default AdminLayout