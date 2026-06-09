import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

  const [carrito, setCarrito] = useState(() => {

    const carritoGuardado = localStorage.getItem('carrito')

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : []

  })

  useEffect(() => {

    localStorage.setItem(
      'carrito',
      JSON.stringify(carrito)
    )

  }, [carrito])

  const agregarAlCarrito = (producto) => {

    const existe = carrito.find(
      (item) => item.nombre === producto.nombre
    )

    if (existe) {

      const nuevoCarrito = carrito.map((item) => {

        if (item.nombre === producto.nombre) {

          return {
            ...item,
            cantidad: item.cantidad + 1
          }

        }

        return item

      })

      setCarrito(nuevoCarrito)

    } else {

      setCarrito((prev) => [

        ...prev,

        {
          ...producto,
          cantidad: 1
        }

      ])

    }

  }

  const aumentarCantidad = (nombre) => {

    const nuevoCarrito = carrito.map((item) => {

      if (item.nombre === nombre) {

        return {
          ...item,
          cantidad: item.cantidad + 1
        }

      }

      return item

    })

    setCarrito(nuevoCarrito)

  }

  const disminuirCantidad = (nombre) => {

    const nuevoCarrito = carrito
      .map((item) => {

        if (item.nombre === nombre) {

          return {
            ...item,
            cantidad: item.cantidad - 1
          }

        }

        return item

      })
      .filter((item) => item.cantidad > 0)

    setCarrito(nuevoCarrito)

  }

  const actualizarCantidad = (
    nombre,
    cantidad
  ) => {

    const nuevoCarrito =
      carrito.map((item) => {

        if (
          item.nombre === nombre
        ) {

          return {

            ...item,

            cantidad

          }

        }

        return item

      })

    setCarrito(
      nuevoCarrito
    )

  }

  const eliminarDelCarrito = (nombre) => {

    const nuevoCarrito = carrito.filter(
      (item) => item.nombre !== nombre
    )

    setCarrito(nuevoCarrito)

  }

  const vaciarCarrito = () => {

    setCarrito([])

  }

  const total = carrito.reduce(

    (acc, item) =>

      acc + (item.precio * item.cantidad),

    0

  )

  return (

    <CartContext.Provider
      value={{

        carrito,

        agregarAlCarrito,

        aumentarCantidad,

        disminuirCantidad,

        actualizarCantidad,

        eliminarDelCarrito,

        vaciarCarrito,

        total

      }}
    >

      {children}

    </CartContext.Provider>

  )
}

export function useCart() {

  return useContext(CartContext)

}