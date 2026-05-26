import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Home from '../pages/Home'

import Catalogo from '../pages/Catalogo'

import Carrito from '../pages/Carrito'

import DashboardAdmin from '../pages/DashboardAdmin'

import AgregarPlanta from '../pages/AgregarPlanta'

import AdminPlantas from '../pages/AdminPlantas'

import EditarPlanta from '../pages/EditarPlanta'

import DetallePlanta from '../pages/DetallePlanta'

import Login from '../pages/Login'

import AdminRoute from './AdminRoute'

import MisPedidos from '../pages/MisPedidos'

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />

        <Route
          path="/carrito"
          element={<Carrito />}
        />

        <Route
          path="/planta/:id"
          element={<DetallePlanta />}
        />

        <Route
          path="/mis-pedidos"
          element={<MisPedidos />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>

              <DashboardAdmin />

            </AdminRoute>
          }
        />

        <Route
          path="/agregar-planta"
          element={
            <AdminRoute>

              <AgregarPlanta />

            </AdminRoute>
          }
        />

        <Route
          path="/admin-plantas"
          element={
            <AdminRoute>

              <AdminPlantas />

            </AdminRoute>
          }
        />

        <Route
          path="/editar-planta/:id"
          element={
            <AdminRoute>

              <EditarPlanta />

            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}

export default AppRouter