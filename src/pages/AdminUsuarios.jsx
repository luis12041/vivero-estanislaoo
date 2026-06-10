import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Box,
  Chip,
  Divider
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  getDocs
} from 'firebase/firestore'

import EmailIcon
  from '@mui/icons-material/Email'

import PersonIcon
  from '@mui/icons-material/Person'

import AdminPanelSettingsIcon
  from '@mui/icons-material/AdminPanelSettings'

import BadgeIcon
  from '@mui/icons-material/Badge'

import { db } from '../firebase/config'

import AdminLayout from '../layouts/AdminLayout'

function AdminUsuarios() {

  const [usuarios, setUsuarios] =
    useState([])

  useEffect(() => {

    async function cargarUsuarios() {

      const snapshot =
        await getDocs(
          collection(db, 'usuarios')
        )

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

      setUsuarios(data)

    }

    cargarUsuarios()

  }, [])

  return (

    <AdminLayout>

      <Box sx={{ mb: 5 }}>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: '#1b1b1b'
          }}
        >

          👥 Gestión de Usuarios

        </Typography>

        <Typography
          sx={{
            color: '#666',
            mt: 1,
            fontSize: 18
          }}
        >

          Administra los usuarios registrados,
          roles y permisos del sistema.

        </Typography>

      </Box>

      <Grid
        container
        spacing={3}
      >

        {usuarios.map((usuario) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={usuario.id}
          >

            <Card
              sx={{

                height: '100%',

                borderRadius: 5,

                overflow: 'hidden',

                background:
                  '#fff',

                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.08)',

                transition: '0.3s',

                '&:hover': {

                  transform:
                    'translateY(-8px)',

                  boxShadow:
                    '0 20px 40px rgba(0,0,0,0.12)'

                }

              }}
            >

              <Box
                sx={{
                  height: 90,
                  background:
                    'linear-gradient(135deg,#2e7d32,#43a047)'
                }}
              />

              <CardContent
                sx={{
                  mt: -5
                }}
              >

                <Stack
                  spacing={2}
                  alignItems="center"
                >

                  <Avatar
                    sx={{

                      width: 80,

                      height: 80,

                      fontSize: 30,

                      fontWeight: 800,

                      border:
                        '4px solid white',

                      background:
                        'linear-gradient(135deg,#1b5e20,#43a047)',

                      boxShadow:
                        '0 8px 20px rgba(0,0,0,0.20)'

                    }}
                  >

                    {usuario.nombre?.[0] || 'U'}

                  </Avatar>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      textAlign: 'center'
                    }}
                  >

                    {usuario.nombre || 'Usuario'}

                  </Typography>

                  <Chip

                    label={
                      usuario.role === 'admin'
                        ? 'Administrador'
                        : usuario.role === 'empleado'
                          ? 'Empleado'
                          : 'Cliente'
                    }

                    color={
                      usuario.role === 'admin'
                        ? 'error'
                        : usuario.role === 'empleado'
                          ? 'warning'
                          : 'success'
                    }

                    sx={{
                      fontWeight: 700
                    }}

                  />

                  <Divider
                    flexItem
                  />

                  <Stack
                    spacing={1.5}
                    sx={{
                      width: '100%'
                    }}
                  >

                    <Box
                      sx={{

                        display: 'flex',

                        alignItems: 'center',

                        gap: 1,

                        p: 1.5,

                        borderRadius: 3,

                        background:
                          '#f5f5f5'

                      }}
                    >

                      <PersonIcon
                        sx={{
                          color: '#2e7d32'
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600
                        }}
                      >

                        {usuario.nombre}

                      </Typography>

                    </Box>

                    <Box
                      sx={{

                        display: 'flex',

                        alignItems: 'center',

                        gap: 1,

                        p: 1.5,

                        borderRadius: 3,

                        background:
                          '#f5f5f5'

                      }}
                    >

                      <EmailIcon
                        sx={{
                          color: '#2e7d32'
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 13,
                          wordBreak:
                            'break-word'
                        }}
                      >

                        {usuario.correo ||
                          usuario.email}

                      </Typography>

                    </Box>

                    <Box
                      sx={{

                        display: 'flex',

                        alignItems: 'center',

                        gap: 1,

                        p: 1.5,

                        borderRadius: 3,

                        background:
                          '#f5f5f5'

                      }}
                    >

                      <BadgeIcon
                        sx={{
                          color: '#2e7d32'
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600
                        }}
                      >

                        {usuario.role ||
                          'cliente'}

                      </Typography>

                    </Box>

                  </Stack>

                </Stack>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </AdminLayout>

  )

}

export default AdminUsuarios