const express = require('express')

const cors = require('cors')

const Stripe = require('stripe')

const admin = require('firebase-admin')

require('dotenv').config()

/* =========================
FIREBASE JSON DEBUG
========================= */

let serviceAccount

try {

  serviceAccount =
    JSON.parse(
      process.env
        .FIREBASE_SERVICE_ACCOUNT
    )

  console.log(
    '🔥 Firebase JSON OK'
  )

} catch (error) {

  console.log(
    '❌ ERROR FIREBASE JSON'
  )

  console.log(error)

}

const app = express()

/* =========================
CORS
========================= */

app.use(

  cors({

    origin: '*',

    methods: [

      'GET',

      'POST',

      'OPTIONS'

    ]

  })

)

/* =========================
IMPORTANTE STRIPE WEBHOOK
========================= */

app.use(

  '/webhook',

  express.raw({

    type:
      'application/json'

  })

)

app.use(express.json())

/* =========================
FIREBASE ADMIN
========================= */

admin.initializeApp({

  credential:
    admin.credential.cert(
      serviceAccount
    )

})

const db =
  admin.firestore()

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

      const total =
        productos.reduce(

          (acc, producto) =>

            acc +

            producto.precio *
            producto.cantidad,

          0

        )

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
              datosCliente.notas,

            productos:
              JSON.stringify(
                productos
              ),

            total:
              total.toString()

          }

        })

      res.json({

        url:
          session.url

      })

    } catch (error) {

      console.log(
        '❌ ERROR CREAR PAGO'
      )

      console.log(error)

      res.status(500).json({

        error:
          'Error al crear pago'

      })

    }

  }

)

/* =========================
WEBHOOK
========================= */

app.post(

  '/webhook',

  async (req, res) => {

    try {

      const sig =
        req.headers[
          'stripe-signature'
        ]

      const event =
        stripe.webhooks.constructEvent(

          req.body,

          sig,

          process.env
            .STRIPE_WEBHOOK_SECRET

        )

      if (
        event.type ===
        'checkout.session.completed'
      ) {

        const session =
          event.data.object

        const productos =
          JSON.parse(
            session.metadata
              .productos
          )

        await db
          .collection(
            'pedidos'
          )
          .add({

            nombre:
              session.metadata
                .nombre,

            telefono:
              session.metadata
                .telefono,

            direccion:
              session.metadata
                .direccion,

            referencia:
              session.metadata
                .referencia,

            ubicacion:
              session.metadata
                .ubicacion,

            notas:
              session.metadata
                .notas,

            productos,

            total:
              Number(
                session.metadata
                  .total
              ),

            estado:
              'Pagado',

            stripeSessionId:
              session.id,

            fecha:
              new Date()

          })

        console.log(
          '✅ Pedido guardado'
        )

      }

      res.sendStatus(200)

    } catch (error) {

      console.log(
        '❌ ERROR WEBHOOK'
      )

      console.log(error)

      res.sendStatus(400)

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