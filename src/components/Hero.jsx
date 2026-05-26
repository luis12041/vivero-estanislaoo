import {
  Box,
  Typography,
  Button,
  Grid
} from '@mui/material'

import { Link } from 'react-router-dom'

function Hero() {
  return (

    <Grid
      container
      spacing={4}
      alignItems="center"
      sx={{
        minHeight: '80vh'
      }}
    >

      <Grid item xs={12} md={6}>

        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '3rem',
              md: '5rem'
            },
            color: '#1b1b1b',
            mb: 2
          }}
        >

          Plantas que
          transforman
          espacios 🌱

        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#555',
            mb: 4,
            maxWidth: '500px'
          }}
        >

          Descubre plantas naturales, macetas y decoración
          para darle vida a tu hogar.

        </Typography>

        <Button
          component={Link}
          to="/catalogo"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5
          }}
        >

          Ver catálogo

        </Button>

      </Grid>

      <Grid item xs={12} md={6}>

        <Box
          component="img"
          src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop"
          alt="plantas"
          sx={{
            width: '100%',
            borderRadius: 6,
            boxShadow: 5
          }}
        />

      </Grid>

    </Grid>

  )
}

export default Hero