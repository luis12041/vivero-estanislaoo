import {
  useEffect
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

function CompraExitosa() {

  const navigate =
    useNavigate()

  useEffect(() => {

    localStorage.removeItem(
      'carrito'
    )

    window.dispatchEvent(
      new Event('storage')
    )

    const timer = setTimeout(() => {

      navigate(
        '/mis-pedidos'
      )

    }, 2000)

    return () =>
      clearTimeout(timer)

  }, [navigate])

  return (

    <div
      style={{
        textAlign: 'center',
        marginTop: '100px'
      }}
    >

      <h1>
        ✅ Pago realizado con éxito
      </h1>

      <p>
        Redirigiendo...
      </p>

    </div>

  )

}

export default CompraExitosa