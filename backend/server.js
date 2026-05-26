const express = require('express')

const cors = require('cors')

const Stripe = require('stripe')

require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

/* =========================
STRIPE
========================= */

const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY
)

/* =========================
RUTA TEST
========================= */

app.get('/', (req, res) => {

  res.send(
    '🔥 Backend Stripe funcionando'
  )

})

/* =========================
CREAR PAGO
========================= */

app.post(
  '/crear-pago',

  async (req, res) => {

    try {

      const {

        productos,

        datosCliente

      } = req.body

      const line_items =

        productos.map(
          (producto) => ({

            price_data: {

              currency: 'mxn',

              product_data: {

                name:
                  producto.nombre

              },

              unit_amount:

                Number(
                  producto.precio
                ) * 100

            },

            quantity:
              producto.cantidad

          })
        )

      const session =

        await stripe.checkout.sessions.create({

          payment_method_types: [
            'card'
          ],

          line_items,

          mode: 'payment',

          success_url:
            'https://vivero-estanislaoo.web.app/catalogo',

          cancel_url:
            'https://vivero-estanislaoo.web.app/carrito',

          metadata: {

            nombre:
              datosCliente.nombre,

            telefono:
              datosCliente.telefono,

            direccion:
              datosCliente.direccion,

            referencia:
              datosCliente.referencia,

            ubicacion:
              datosCliente.ubicacion,

            notas:
              datosCliente.notas

          }

        })

      res.json({

        url:
          session.url

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error:
          'Error al crear pago'

      })

    }

  }

)

/* =========================
PUERTO
========================= */

const PORT =
  process.env.PORT || 3000

app.listen(PORT, () => {

  console.log(

    `🔥 Servidor corriendo en puerto ${PORT}`

  )

})