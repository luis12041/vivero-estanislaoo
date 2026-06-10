import {
    useEffect
} from 'react'

import {
    useNavigate
} from 'react-router-dom'

import {
    useCart
} from '../context/CartContext'

function CompraExitosa() {

    const navigate =
        useNavigate()

    const {
        vaciarCarrito
    } = useCart()

    useEffect(() => {

        vaciarCarrito()

        localStorage.removeItem(
            'carrito'
        )

        const timer = setTimeout(() => {

            navigate(
                '/mis-pedidos'
            )

        }, 2000)

        return () =>
            clearTimeout(timer)

    }, [navigate, vaciarCarrito])

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