import { useEffect } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { http } from "@/api/http"
import { logout } from "@/auth/auth"

export default function AdminLayout() {
  const nav = useNavigate()

  // ✅ her sayfa açılışında token gerçekten admin mi kontrol et
  useEffect(() => {
    const check = async () => {
      try {
        // backend'de var: GET /api/admin/check
        await http.get("/admin/check")
      } catch {
        logout()
        nav("/login", { replace: true })
      }
    }
    check()
  }, [nav])

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r p-4">
        <div className="text-lg font-semibold">Admin</div>
        <Separator className="my-4" />

        <nav className="flex flex-col gap-2">
          <Link className="text-sm hover:underline" to="/">
            Dashboard
          </Link>
          <Link className="text-sm hover:underline" to="/categories">
            Categories
          </Link>
          <Link className="text-sm hover:underline" to="/products">
            Products
          </Link>
        </nav>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              logout()
              nav("/login", { replace: true })
            }}
          >
            Çıkış
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
