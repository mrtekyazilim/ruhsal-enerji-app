import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { isAuthed, logout } from "@/auth/auth"
import { http } from "@/api/http"

export default function ProtectedRoute() {
  const [ok, setOk] = useState<null | boolean>(null)

  useEffect(() => {
    const run = async () => {
      if (!isAuthed()) {
        setOk(false)
        return
      }

      try {
        // ✅ backend: GET /api/admin/check
        await http.get("/admin/check")
        setOk(true)
      } catch {
        logout()
        setOk(false)
      }
    }

    run()
  }, [])

  if (ok === null) return null
  if (!ok) return <Navigate to="/login" replace />
  return <Outlet />
}
