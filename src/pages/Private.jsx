import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Private() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    api.get('/private').then(res => setData(res.data))
  }, [])

  return (
    <>
    <pre>{JSON.stringify(data, null, 2)}</pre>  
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}
