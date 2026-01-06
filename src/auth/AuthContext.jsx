import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('accessToken')
  )

  const login = ({ accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setIsAuth(true)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsAuth(false)
  }

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        logout()
      }
    }

    window.addEventListener('storage', syncAuth)

    return () => {
      window.removeEventListener('storage', syncAuth)
    }
  }, [])


  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
