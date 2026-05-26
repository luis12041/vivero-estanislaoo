import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

import { db } from '../firebase/config'

export async function obtenerPlantas() {

  const plantasRef = collection(db, 'plantas')

  const snapshot = await getDocs(plantasRef)

  const plantas = snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data()

  }))

  return plantas
}

export async function eliminarPlanta(id) {

  const plantaRef = doc(db, 'plantas', id)

  await deleteDoc(plantaRef)

}

export async function editarPlanta(id, data) {

  const plantaRef = doc(db, 'plantas', id)

  await updateDoc(plantaRef, data)

}