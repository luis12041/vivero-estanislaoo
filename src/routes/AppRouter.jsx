import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Catalogo from '../pages/Catalogo'
import Carrito from '../pages/Carrito'
import DashboardAdmin from '../pages/DashboardAdmin'
import AdminPlantas from '../pages/AdminPlantas'
import EditarPlanta from '../pages/EditarPlanta'
import Login from '../pages/Login'
import AdminRoute from './AdminRoute'
import MisPedidos from '../pages/MisPedidos'

import AdminPedidos
  from '../pages/AdminPedidos'

import AdminUsuarios
  from '../pages/AdminUsuarios'

import AdminReportes
  from '../pages/AdminReportes'

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        <Route
          path="/admin-reportes"
          element={
            <AdminRoute>
              <AdminReportes />
            </AdminRoute>
          }

        />

        <Route
          path="/login"
          element={<Login />}
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
          path="/admin-plantas"
          element={
            <AdminRoute>
              <AdminPlantas />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-pedidos"
          element={
            <AdminRoute>
              <AdminPedidos />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-usuarios"
          element={
            <AdminRoute>
              <AdminUsuarios />
            </AdminRoute>
          }
        />

        <Route
          path="/empleado"
          element={
            <DashboardAdmin />
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