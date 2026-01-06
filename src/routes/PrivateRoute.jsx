import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function PrivateRoute({ children }) {
  const { isAuth } = useAuth()

  if (isAuth === undefined) {
    return <div>Cargando...</div> // o null
  }
  
  return isAuth ? children : <Navigate to="/login" />
}
