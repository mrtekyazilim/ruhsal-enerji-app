import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { setToken } from "@/auth/auth"
import { http } from "@/api/http"

export default function Login() {
  const nav = useNavigate()
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    setLoading(true)

    const payload = { username, password }
    console.log("LOGIN PAYLOAD =>", payload)

    try {
      const res = await http.post("/auth/admin/login", payload)
      const token = res.data?.token
      if (!token) throw new Error("Token gelmedi")

      setToken(token)
      nav("/", { replace: true })
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Login error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Yönetici Girişi</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <Input
              name="username"
              placeholder="Kullanıcı adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <Input
              name="password"
              placeholder="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {err && (
              <pre className="text-xs text-red-600 whitespace-pre-wrap">
                {typeof err === "string" ? err : JSON.stringify(err, null, 2)}
              </pre>
            )}

            <Button disabled={loading} type="submit">
              {loading ? "Giriş..." : "Giriş"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
