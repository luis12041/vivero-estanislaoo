import {
  Navigate
} from 'react-router-dom'

import {
  auth
} from '../firebase/config'

function ProtectedRoute({ children }) {

  const usuario = auth.currentUser

  if (!usuario) {

    return <Navigate to="/login" />

  }

  return children

}

export default ProtectedRoute