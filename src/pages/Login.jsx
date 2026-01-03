import { useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await api.post('/auth/login', { email, password })
    login(res.data.token)
    navigate('/private')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit" >Login</button>
    </form>
  )
}
