import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// REQUEST: agregar access token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// RESPONSE: manejar expiración
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config

    if ( err.response?.status === 401 && !originalRequest._retry ) {
      
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        const res = await axios.post(
          'http://localhost:3000/api/auth/refresh',
          { refreshToken }
        )

        localStorage.setItem(
          'accessToken',
          res.data.accessToken
        )

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`

        return api(originalRequest)
      } catch (e) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }

    return Promise.reject(err)
  }
)

export default api
