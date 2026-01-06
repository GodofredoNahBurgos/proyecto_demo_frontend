import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import api from '../api/axios'

export default function Login() {

  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      const res = await api.post('/auth/login', { email, password })
      login({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
      })
      navigate('/private')
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Credenciales inválidas')
      } else {
        alert('Error del servidor')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Contraseña</label>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <label htmlFor="">Contraseña</label>
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit" >Login</button>
    </form>
  )
}
