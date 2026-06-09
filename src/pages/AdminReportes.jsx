import {
    Box,
    Typography,
    Grid,
    Card,
    Avatar,
    Stack
} from '@mui/material'

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from 'recharts'

import {
    useEffect,
    useState
} from 'react'

import {
    collection,
    getDocs
} from 'firebase/firestore'

import {
    db
} from '../firebase/config'

import AdminLayout
    from '../layouts/AdminLayout'

import PaymentsIcon
    from '@mui/icons-material/Payments'

import ShoppingBagIcon
    from '@mui/icons-material/ShoppingBag'

import GrassIcon
    from '@mui/icons-material/Grass'

import PeopleIcon
    from '@mui/icons-material/People'

function AdminReportes() {

    const [ventas,
        setVentas] =
        useState(0)

    const [entregados,
        setEntregados] =
        useState(0)

    const [plantaTop,
        setPlantaTop] =
        useState('Ninguna')

    const [clientes,
        setClientes] =
        useState(0)

    const [plantasGrafica,
        setPlantasGrafica] =
        useState([])

    const [luzGrafica,
        setLuzGrafica] =
        useState([])

    const [ventasHoy, setVentasHoy] = useState(0)

    const [pedidosHoy, setPedidosHoy] = useState(0)

    const [ventasSemana, setVentasSemana] = useState(0)

    const [pedidosSemana, setPedidosSemana] = useState(0)

    const [ventasMes, setVentasMes] = useState(0)

    const [pedidosMes, setPedidosMes] = useState(0)

    useEffect(() => {

        async function cargarReportes() {

            const historialSnapshot =
                await getDocs(
                    collection(
                        db,
                        'historial_pedidos'
                    )
                )

            const historial =
                historialSnapshot.docs.map(
                    (doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })
                )

            const hoy = new Date()

            const inicioHoy = new Date(
                hoy.getFullYear(),
                hoy.getMonth(),
                hoy.getDate()
            )

            const hace7Dias = new Date()

            hace7Dias.setDate(
                hoy.getDate() - 7
            )

            const mesActual =
                hoy.getMonth()

            const anioActual =
                hoy.getFullYear()

            const pedidosHoyArray =
                historial.filter(
                    pedido =>
                        pedido.fechaEntrega &&
                        pedido.fechaEntrega.toDate() >= inicioHoy
                )

            const pedidosSemanaArray =
                historial.filter(
                    pedido =>
                        pedido.fechaEntrega &&
                        pedido.fechaEntrega.toDate() >= hace7Dias
                )

            const pedidosMesArray =
                historial.filter(
                    pedido => {

                        if (!pedido.fechaEntrega)
                            return false

                        const fecha =
                            pedido.fechaEntrega.toDate()

                        return (
                            fecha.getMonth() === mesActual &&
                            fecha.getFullYear() === anioActual
                        )

                    }
                )

            setPedidosHoy(
                pedidosHoyArray.length
            )

            setPedidosSemana(
                pedidosSemanaArray.length
            )

            setPedidosMes(
                pedidosMesArray.length
            )

            setVentasHoy(

                pedidosHoyArray.reduce(
                    (acc, pedido) =>
                        acc + (pedido.total || 0),
                    0
                )

            )

            setVentasSemana(

                pedidosSemanaArray.reduce(
                    (acc, pedido) =>
                        acc + (pedido.total || 0),
                    0
                )

            )

            setVentasMes(

                pedidosMesArray.reduce(
                    (acc, pedido) =>
                        acc + (pedido.total || 0),
                    0
                )

            )

            const totalVentas =

                historial.reduce(

                    (acc, pedido) =>

                        acc +
                        (pedido.total || 0),

                    0

                )

            setVentas(
                totalVentas
            )

            setEntregados(
                historial.length
            )

            const conteoPlantas = {}

            const conteoLuz = {}

            const clientesSet =
                new Set()

            historial.forEach(
                (pedido) => {

                    clientesSet.add(
                        pedido.nombre
                    )

                    pedido.productos?.forEach(
                        (producto) => {

                            conteoPlantas[
                                producto.nombre
                            ] =

                                (
                                    conteoPlantas[
                                    producto.nombre
                                    ] || 0
                                )

                                +

                                producto.cantidad

                            conteoLuz[
                                producto.tipoLuz
                            ] =

                                (
                                    conteoLuz[
                                    producto.tipoLuz
                                    ] || 0
                                )

                                +

                                producto.cantidad

                        }
                    )

                }
            )

            setClientes(
                clientesSet.size
            )

            const mejorPlanta =

                Object.keys(
                    conteoPlantas
                ).length > 0

                    ?

                    Object.keys(
                        conteoPlantas
                    ).reduce(
                        (a, b) =>
                            conteoPlantas[a] >
                                conteoPlantas[b]
                                ? a
                                : b
                    )

                    :

                    'Ninguna'

            setPlantaTop(
                mejorPlanta
            )
            const datosPlantas =

                Object.entries(
                    conteoPlantas
                ).map(

                    ([nombre, cantidad]) => ({

                        nombre,

                        cantidad

                    })

                )

            setPlantasGrafica(
                datosPlantas
                    .sort(
                        (a, b) =>
                            b.cantidad - a.cantidad
                    )
                    .slice(0, 5)
            )

            const datosLuz =

                Object.entries(
                    conteoLuz
                ).map(

                    ([nombre, cantidad]) => ({

                        name: nombre,

                        value: cantidad

                    })

                )

            setLuzGrafica(
                datosLuz
            )

        }

        cargarReportes()

    }, [])

    const cards = [

        {

            titulo:
                'Ventas Totales',

            valor:
                `$${ventas.toLocaleString(
                    'es-MX',
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}`,

            icono:
                <PaymentsIcon />,

            color:
                '#8e24aa'

        },

        {

            titulo:
                'Pedidos Entregados',

            valor:
                entregados,

            icono:
                <ShoppingBagIcon />,

            color:
                '#2e7d32'

        },

        {

            titulo:
                'Planta Más Vendida',

            valor:
                plantaTop,

            icono:
                <GrassIcon />,

            color:
                '#00897b'

        },

        {
            titulo: 'Clientes Únicos',
            valor: clientes,
            icono: <PeopleIcon />,
            color: '#1565c0'
        }

    ]

    return (

        <AdminLayout>

            <Box
                sx={{
                    mb: 4
                }}
            >

                <Typography
                    sx={{
                        fontSize: 42,
                        fontWeight: 900
                    }}
                >

                    📊 Reportes

                </Typography>

                <Typography
                    sx={{
                        color: '#666'
                    }}
                >

                    Estadísticas generales
                    del vivero

                </Typography>

            </Box>

            <Grid
                container
                spacing={2}
            >

                {cards.map(
                    (card, index) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={index}
                        >
                            <Card
                                sx={{
                                    p: 3,

                                    borderRadius: 4,

                                    border:
                                        '1px solid #edf2f7',

                                    boxShadow:
                                        '0 6px 18px rgba(0,0,0,0.04)',

                                    transition: '0.2s',

                                    '&:hover': {

                                        transform:
                                            'translateY(-3px)',

                                        boxShadow:
                                            '0 12px 24px rgba(0,0,0,0.08)'

                                    }

                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Avatar
                                        sx={{

                                            width: 56,

                                            height: 56,

                                            bgcolor:
                                                '#f4f6f8',

                                            color:
                                                card.color

                                        }}
                                    >

                                        {card.icono}

                                    </Avatar>

                                    <Box>

                                        <Typography
                                            sx={{
                                                color: '#666'
                                            }}
                                        >

                                            {card.titulo}

                                        </Typography>

                                        <Typography
                                            sx={{

                                                fontSize: 28,

                                                fontWeight: 900,

                                                color:
                                                    card.color

                                            }}
                                        >

                                            {card.valor}

                                        </Typography>

                                    </Box>

                                </Stack>

                            </Card>

                        </Grid>

                    )
                )}

            </Grid>

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 2
                }}
            >

                <Grid
                    item
                    xs={12}
                >


                    <Card
                        sx={{
                            mt: 3,
                            p: 4,
                            borderRadius: 4,
                            border: '1px solid #edf2f7',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: 22,
                                fontWeight: 800,
                                mb: 3
                            }}
                        >
                            📈 Rendimiento de Ventas
                        </Typography>

                        <Grid
                            container
                            spacing={3}
                        >

                            <Grid
                                item
                                xs={12}
                                md={4}
                            >

                                <Typography
                                    sx={{
                                        color: '#666'
                                    }}
                                >
                                    Hoy
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 900,
                                        color: '#2e7d32'
                                    }}
                                >
                                    ${ventasHoy}
                                </Typography>

                                <Typography>
                                    {pedidosHoy} pedidos
                                </Typography>

                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={4}
                            >

                                <Typography
                                    sx={{
                                        color: '#666'
                                    }}
                                >
                                    Semana
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 900,
                                        color: '#ef6c00'
                                    }}
                                >
                                    ${ventasSemana}
                                </Typography>

                                <Typography>
                                    {pedidosSemana} pedidos
                                </Typography>

                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={4}
                            >

                                <Typography
                                    sx={{
                                        color: '#666'
                                    }}
                                >
                                    Mes
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 900,
                                        color: '#00897b'
                                    }}
                                >
                                    ${ventasMes}
                                </Typography>

                                <Typography>
                                    {pedidosMes} pedidos
                                </Typography>

                            </Grid>

                        </Grid>

                    </Card>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={7}
                >

                    <Card
                        sx={{
                            p: 3,

                            borderRadius: 4,

                            border:
                                '1px solid #edf2f7',

                            boxShadow:
                                '0 6px 18px rgba(0,0,0,0.04)',

                            transition: '0.2s',

                            '&:hover': {

                                transform:
                                    'translateY(-3px)',

                                boxShadow:
                                    '0 12px 24px rgba(0,0,0,0.08)'

                            }

                        }}
                    >

                        <Typography
                            sx={{
                                fontWeight: 800,
                                mb: 1
                            }}
                        >
                            🌱 Plantas más vendidas
                        </Typography>

                        <Typography
                            sx={{
                                color: '#777',
                                mb: 2
                            }}
                        >
                            Top 5 plantas más vendidas
                        </Typography>


                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={plantasGrafica}
                            >

                                <XAxis
                                    dataKey="nombre"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="cantidad"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </Card>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={5}
                >

                    <Card
                        sx={{
                            p: 3,

                            borderRadius: 4,

                            border:
                                '1px solid #edf2f7',

                            boxShadow:
                                '0 6px 18px rgba(0,0,0,0.04)',

                            transition: '0.2s',

                            '&:hover': {

                                transform:
                                    'translateY(-3px)',

                                boxShadow:
                                    '0 12px 24px rgba(0,0,0,0.08)'

                            }

                        }}
                    >

                        <Typography
                            sx={{
                                fontWeight: 800,
                                mb: 1
                            }}
                        >
                            ☀️ Tipo de luz
                        </Typography>

                        <Typography
                            sx={{
                                color: '#777',
                                mb: 2
                            }}
                        >
                            Distribución por tipo de luz
                        </Typography>


                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={luzGrafica}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >

                                    {luzGrafica.map(
                                        (entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    index === 0
                                                        ? '#f9a825'
                                                        : index === 1
                                                            ? '#43a047'
                                                            : '#1e88e5'
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </Card>

                </Grid>

            </Grid>

        </AdminLayout >

    )

}

export default AdminReportes