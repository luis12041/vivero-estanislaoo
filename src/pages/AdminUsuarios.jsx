import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack
} from '@mui/material'

import {
  useEffect,
  useState
} from 'react'

import {
  collection,
  getDocs
} from 'firebase/firestore'

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

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 4
        }}
      >

        Usuarios 👥

      </Typography>

      <Grid container spacing={4}>

        {usuarios.map((usuario) => (

          <Grid
            item
            xs={12}
            md={4}
            key={usuario.id}
          >

            <Card
              sx={{
                borderRadius: 5,
                boxShadow:
                  '0 10px 25px rgba(0,0,0,0.08)'
              }}
            >

              <CardContent>

                <Stack
                  spacing={2}
                  alignItems="center"
                >

                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      fontSize: 35,
                      backgroundColor:
                        '#2e7d32'
                    }}
                  >

                    {usuario.nombre?.[0] || 'U'}

                  </Avatar>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700
                    }}
                  >

                    {usuario.nombre}

                  </Typography>

                  <Typography>

                    {usuario.email}

                  </Typography>

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