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

    productos:
      carrito,

    total,

    estado:
      'Pendiente',

    fecha:
      new Date()

  }

  await addDoc(
    collection(db, 'pedidos'),
    pedido
  )

}