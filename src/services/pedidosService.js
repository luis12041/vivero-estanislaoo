import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'

import {
  auth,
  db
} from '../firebase/config'

export async function crearPedido(
  carrito,
  total,
  datosCliente
) {

  const usuario =
    auth.currentUser

  if (!usuario) {

    throw new Error(
      'Usuario no autenticado'
    )

  }

  for (const producto of carrito) {

    const plantaRef =
      doc(
        db,
        'plantas',
        producto.id
      )

    const plantaSnap =
      await getDoc(
        plantaRef
      )

    if (
      !plantaSnap.exists()
    ) {

      throw new Error(
        `La planta ${producto.nombre} no existe`
      )

    }

    const stockActual =
      plantaSnap.data().stock || 0

    if (
      producto.cantidad >
      stockActual
    ) {

      throw new Error(
        `Solo hay ${stockActual} unidades disponibles de ${producto.nombre}`
      )

    }

  }

  const pedido = {

    usuario:
      usuario.email,

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

    metodoPago:
      datosCliente.metodoPago || 'Stripe',

    tipoEntrega:
      datosCliente.tipoEntrega || 'Envio',

    productos:
      carrito,

    total,

    estado:

      datosCliente.tipoEntrega === 'Tienda'

        ? 'Listo para recoger'

        : 'Pendiente',

    fecha:
      new Date()

  }

  await addDoc(
    collection(db, 'pedidos'),
    pedido
  )
  for (const producto of carrito) {

    const plantaRef =
      doc(
        db,
        'plantas',
        producto.id
      )

    const plantaSnap =
      await getDoc(
        plantaRef
      )

    const stockActual =
      plantaSnap.data().stock || 0

    await updateDoc(
      plantaRef,
      {
        stock:
          stockActual -
          producto.cantidad
      }
    )

  }

}