import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL must be set in the frontend environment.')
}

const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
})

axiosClient.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken')

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default axiosClient
