import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Private from './pages/Private'
import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/AuthContext'

function HomeRedirect() {
  const { isAuth } = useAuth()
  return <Navigate to={isAuth ? "/private" : "/login"} />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/private"
        element={
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}