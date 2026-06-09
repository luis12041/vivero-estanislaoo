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

      if (
        existe.cantidad >=
        producto.stock
      ) {

        alert(
          `Solo hay ${producto.stock} unidades disponibles`
        )

        return

      }

      const nuevoCarrito = carrito.map((item) => {

        if (
          item.nombre === producto.nombre
        ) {

          return {

            ...item,

            cantidad:
              item.cantidad + 1

          }

        }

        return item

      })

      setCarrito(nuevoCarrito)

    } else {

      if (
        producto.stock <= 0
      ) {

        alert(
          'Producto agotado'
        )

        return

      }

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

    const nuevoCarrito = carrito.map(
      (item) => {

        if (
          item.nombre === nombre
        ) {

          if (
            item.cantidad >=
            item.stock
          ) {

            alert(
              `Solo hay ${item.stock} unidades disponibles`
            )

            return item

          }

          return {

            ...item,

            cantidad:
              item.cantidad + 1

          }

        }

        return item

      }
    )

    setCarrito(
      nuevoCarrito
    )

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

    const item = carrito.find(
      (producto) =>
        producto.nombre === nombre
    )

    if (!item) {

      return

    }

    if (cantidad < 1) {

      return

    }

    if (
      cantidad > item.stock
    ) {

      alert(
        `Solo hay ${item.stock} unidades disponibles`
      )

      cantidad = item.stock

    }

    const nuevoCarrito =
      carrito.map((producto) => {

        if (
          producto.nombre === nombre
        ) {

          return {

            ...producto,

            cantidad

          }

        }

        return producto

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