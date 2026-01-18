import axios from "axios"
import { getToken, logout } from "@/auth/auth"

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      logout()
      // sayfayı login'e döndürmek için basit yol:
      window.location.href = "/login"
    }
    return Promise.reject(err)
  }
)
