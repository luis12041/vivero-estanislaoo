import {
  Navigate
} from 'react-router-dom'

import {
  useEffect,
  useState
} from 'react'

import {
  doc,
  getDoc
} from 'firebase/firestore'

import {
  onAuthStateChanged
} from 'firebase/auth'

import {
  auth,
  db
} from '../firebase/config'

function AdminRoute({ children }) {

  const [loading,
    setLoading] =
    useState(true)

  const [isPermitido,
    setIsPermitido] =
    useState(false)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (usuario) => {

          if (!usuario) {

            setIsPermitido(false)

            setLoading(false)

            return

          }

          try {

            const docRef =
              doc(
                db,
                'usuarios',
                usuario.uid
              )

            const docSnap =
              await getDoc(docRef)

            if (docSnap.exists()) {

              const data =
                docSnap.data()

              if (

                data.role ===
                'admin'

                ||

                data.role ===
                'empleado'

              ) {

                setIsPermitido(true)

              } else {

                setIsPermitido(false)

              }

            } else {

              setIsPermitido(false)

            }

          } catch (error) {

            console.log(error)

            setIsPermitido(false)

          }

          setLoading(false)

        }

      )

    return () =>
      unsubscribe()

  }, [])

  if (loading) {

    return <h1>Cargando...</h1>

  }

  if (!isPermitido) {

    return <Navigate to="/" />

  }

  return children

}

export default AdminRoute