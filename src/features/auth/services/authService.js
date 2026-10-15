import axiosClient from './axiosClient'

const loginApiUrl = import.meta.env.VITE_LOGIN_API_URL

if (!loginApiUrl) {
  throw new Error('VITE_LOGIN_API_URL must be set in the frontend environment.')
}

export const authService = {
  login(username, password) {
    return axiosClient.post(loginApiUrl, { username, password })
  },
}
