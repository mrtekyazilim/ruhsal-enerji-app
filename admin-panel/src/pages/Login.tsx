import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { setToken } from "@/auth/auth"
import { http } from "@/api/http"
import { Sparkles, MoonStar, Eye, Orbit, ScrollText } from "lucide-react"

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-4 items-start rounded-2xl px-4 py-3 bg-white/5 border border-white/10">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-white/90">{title}</div>
        <div className="text-sm text-white/70">{desc}</div>
      </div>
    </div>
  )
}

export default function Login() {
  const nav = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* arka plan aura */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(800px_450px_at_85%_25%,rgba(236,72,153,0.12),transparent_58%),radial-gradient(900px_600px_at_50%_90%,rgba(34,211,238,0.10),transparent_55%),linear-gradient(180deg,#050613,#0a0b1f)]" />
      {/* yıldız tozu */}
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(2px_2px_at_20px_30px,rgba(255,255,255,0.22),transparent_40%),radial-gradient(1px_1px_at_120px_80px,rgba(255,255,255,0.18),transparent_40%),radial-gradient(1px_1px_at_220px_40px,rgba(255,255,255,0.14),transparent_40%),radial-gradient(2px_2px_at_320px_120px,rgba(255,255,255,0.10),transparent_40%)] bg-[length:360px_180px]" />

      <Card className="w-full max-w-6xl overflow-hidden rounded-[28px] border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.60)]">
        <div className="grid grid-cols-1 md:grid-cols-[440px_1fr]">
          {/* SOL PANEL */}
          <div className="relative p-10 bg-gradient-to-b from-fuchsia-700/35 via-purple-700/25 to-cyan-500/15">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white/90" />
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] text-white/70 uppercase">
                  Ruhsal Enerji
                </div>
                <div className="text-2xl font-extrabold text-white">
                  Admin Panel
                </div>
              </div>
            </div>

            <p className="mt-6 text-white/80 leading-relaxed">
              Danışmanlar, hizmetler ve içerik akışını tek yerden yönetin.
              Kategoriler, ürünler ve vitrin düzeni burada kontrol altında.
            </p>

            <div className="mt-8 space-y-4">
              <Feature
                icon={<MoonStar className="w-5 h-5 text-white/90" />}
                title="Tarot & Yıldız Haritası"
                desc="Danışman hizmetlerini düzenleyin"
              />
              <Feature
                icon={<Eye className="w-5 h-5 text-white/90" />}
                title="Rüyalar & Kahve Falı"
                desc="İçerik ve paketleri yönetin"
              />
              <Feature
                icon={<Orbit className="w-5 h-5 text-white/90" />}
                title="Şamanik & Theta Healing"
                desc="Kategorileri ve vitrini kontrol edin"
              />
              <Feature
                icon={<ScrollText className="w-5 h-5 text-white/90" />}
                title="Güvenli Yönetim"
                desc="Rol tabanlı erişim ve kayıtlar"
              />
            </div>

            <div className="pointer-events-none absolute -inset-10 opacity-60 bg-[radial-gradient(500px_260px_at_20%_10%,rgba(255,255,255,0.16),transparent_60%)]" />
          </div>

          {/* SAĞ PANEL: FORM */}
          <div className="p-10 md:p-12 bg-[rgba(18,16,36,0.72)]">
            <CardHeader className="p-0">
              <CardTitle className="text-center text-4xl font-extrabold text-white">
                Yönetici Girişi
              </CardTitle>
              <p className="text-center mt-2 text-white/60">
                Yönetim paneline erişmek için giriş yapın
              </p>
            </CardHeader>

            <CardContent className="p-0 mt-8">
              <form className="grid gap-4" onSubmit={onSubmit}>
                <Input
                  name="username"
                  placeholder="Kullanıcı adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-white/40
                             focus-visible:ring-4 focus-visible:ring-purple-500/30"
                />
                <Input
                  name="password"
                  placeholder="Şifre"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-white/40
                             focus-visible:ring-4 focus-visible:ring-purple-500/30"
                />

                {err && (
                  <div className="p-4 rounded-xl border border-pink-500/25 bg-pink-500/10">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white/90">
                        Giriş başarısız
                      </div>
                      <button
                        type="button"
                        onClick={() => setErr(null)}
                        className="text-xs text-pink-200 underline"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  disabled={loading}
                  type="submit"
                  className="h-12 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400
                             shadow-[0_14px_40px_rgba(168,85,247,0.28)]
                             hover:opacity-95 active:opacity-90"
                >
                  {loading ? "Giriş..." : "Giriş Yap"}
                </Button>

                <div className="text-center text-xs text-white/45 mt-1">
                  “Düzen, enerjiyi taşır.”
                </div>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}
