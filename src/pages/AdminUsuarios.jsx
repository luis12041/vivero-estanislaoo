import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Box,
  Chip
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

      <Box
        sx={{
          mb: 5
        }}
      >

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: '#1b1b1b'
          }}
        >

          Usuarios 👥

        </Typography>

        <Typography
          sx={{
            color: '#666',
            mt: 1,
            fontSize: 18
          }}
        >

          Administración de usuarios registrados en el sistema

        </Typography>

      </Box>

      <Grid container spacing={4}>

        {usuarios.map((usuario) => (

          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            key={usuario.id}
          >

            <Card
              sx={{
                borderRadius: 6,
                overflow: 'hidden',
                background:
                  'linear-gradient(145deg,#ffffff,#f8f8f8)',
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.08)',
                transition: '0.3s',

                '&:hover': {
                  transform:
                    'translateY(-8px)',
                  boxShadow:
                    '0 15px 40px rgba(0,0,0,0.12)'
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
                  mt: -6
                }}
              >

                <Stack
                  spacing={3}
                  alignItems="center"
                >

                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 40,
                      fontWeight: 800,
                      border:
                        '5px solid white',
                      background:
                        'linear-gradient(135deg,#1b5e20,#43a047)',
                      boxShadow:
                        '0 10px 25px rgba(0,0,0,0.2)'
                    }}
                  >

                    {usuario.nombre?.[0] || 'U'}

                  </Avatar>

                  <Box
                    sx={{
                      textAlign: 'center'
                    }}
                  >

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: '#1b1b1b'
                      }}
                    >

                      {usuario.nombre || 'Usuario'}

                    </Typography>

                    <Chip
                      label="Usuario activo"
                      sx={{
                        mt: 1,
                        backgroundColor:
                          '#e8f5e9',
                        color: '#2e7d32',
                        fontWeight: 700
                      }}
                    />

                  </Box>

                  <Stack
                    spacing={2}
                    sx={{
                      width: '100%'
                    }}
                  >

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                        borderRadius: 3,
                        backgroundColor:
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
                          fontWeight: 600,
                          color: '#444'
                        }}
                      >

                        {usuario.nombre}

                      </Typography>

                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                        borderRadius: 3,
                        backgroundColor:
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
                          fontWeight: 500,
                          color: '#555',
                          wordBreak:
                            'break-word'
                        }}
                      >

                        {usuario.email}

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