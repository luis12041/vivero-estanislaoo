import {
  collection,
  addDoc
} from 'firebase/firestore'

import {
  auth,
  db
} from '../firebase/config'

export async function crearPedido(
  carrito,
  total
) {

  const usuario = auth.currentUser

  if (!usuario) {

    throw new Error(
      'Usuario no autenticado'
    )

  }

  const pedido = {

    usuario: usuario.email,

    productos: carrito,

    total,

    fecha: new Date()

  }

  await addDoc(
    collection(db, 'pedidos'),
    pedido
  )

}