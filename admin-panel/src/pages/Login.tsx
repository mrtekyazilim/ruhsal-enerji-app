import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { setToken } from "@/auth/auth"
import { http } from "@/api/http"
import { Sparkles, MoonStar, Eye, Orbit, ScrollText, Moon, Heart, Flame, Wand2 } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

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
    <div className="flex gap-4 items-start rounded-2xl px-4 py-3 bg-white/5 border border-white/10 transition-colors duration-300">
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
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden dark:bg-slate-950 bg-white transition-colors duration-300">
      {/* arka plan aura - dark mode */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-[radial-gradient(900px_500px_at_15%_10%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(800px_450px_at_85%_25%,rgba(236,72,153,0.12),transparent_58%),radial-gradient(900px_600px_at_50%_90%,rgba(34,211,238,0.10),transparent_55%),linear-gradient(180deg,#050613,#0a0b1f)]" />
      {/* yıldız tozu - dark mode */}
      <div className="absolute inset-0 -z-10 hidden dark:block opacity-30 bg-[radial-gradient(2px_2px_at_20px_30px,rgba(255,255,255,0.22),transparent_40%),radial-gradient(1px_1px_at_120px_80px,rgba(255,255,255,0.18),transparent_40%),radial-gradient(1px_1px_at_220px_40px,rgba(255,255,255,0.14),transparent_40%),radial-gradient(2px_2px_at_320px_120px,rgba(255,255,255,0.10),transparent_40%)] bg-[length:360px_180px]" />

      {/* arka plan light mode */}
      <div className="absolute inset-0 -z-10 dark:hidden block bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
      <div className="absolute inset-0 -z-10 dark:hidden block opacity-25 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(800px_450px_at_85%_25%,rgba(129,140,248,0.08),transparent_58%)]" />

      <Card className="w-full max-w-3xl md:max-w-5xl overflow-visible rounded-[40px] border-purple-200/50 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl dark:shadow-[0_40px_120px_rgba(0,0,0,0.60)] shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/30 transition-colors duration-300 relative border">
        {/* Tema Toggle - Sağ Üst */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0">
          {/* SOL PANEL */}
          <div className="hidden md:flex relative p-10 bg-gradient-to-b dark:from-fuchsia-700/35 dark:via-purple-700/25 dark:to-cyan-500/15 from-purple-700 via-purple-800 to-indigo-800 transition-colors duration-300 rounded-l-[40px] flex-col">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center bg-white/10">
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
          <div className="p-10 md:p-12 md:rounded-r-[40px] rounded-[40px] dark:bg-[rgba(18,16,36,0.72)] bg-white transition-colors duration-300 min-h-[480px] md:min-h-auto flex flex-col justify-center">
            <CardHeader className="p-0">
              <CardTitle className="text-center text-4xl font-extrabold text-purple-700 dark:text-white transition-colors duration-300">
                Yönetici Girişi
              </CardTitle>
              <p className="text-center mt-2 text-slate-600 dark:text-white/60 transition-colors duration-300">
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
                  className="h-12 rounded-xl dark:bg-white/10 dark:border-white/10 dark:text-white dark:placeholder:text-white/40 bg-purple-50 border border-purple-200 text-slate-900 placeholder:text-slate-500
                             focus-visible:ring-4 focus-visible:ring-purple-400/30 transition-colors duration-300"
                />
                <Input
                  name="password"
                  placeholder="Şifre"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-12 rounded-xl dark:bg-white/10 dark:border-white/10 dark:text-white dark:placeholder:text-white/40 bg-purple-50 border border-purple-200 text-slate-900 placeholder:text-slate-500
                             focus-visible:ring-4 focus-visible:ring-purple-400/30 transition-colors duration-300"
                />

                {err && (
                  <div className="p-4 rounded-xl dark:border dark:border-pink-500/25 dark:bg-pink-500/10 border border-pink-300 bg-pink-50 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-pink-900 dark:text-white/90">
                        Giriş başarısız
                      </div>
                      <button
                        type="button"
                        onClick={() => setErr(null)}
                        className="text-xs dark:text-pink-200 dark:underline text-pink-700 underline"
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

                <div className="text-center text-xs text-white/45 dark:text-white/45 text-slate-500 transition-colors duration-300 mt-1">
                  “Düzen, enerjiyi taşır.”
                </div>
                {/* MOBILE ICONS ONLY */}
                <div className="md:hidden flex justify-center gap-4 mt-6">
                  <Moon className="w-6 h-6 text-purple-600 dark:text-cyan-400" />
                  <Eye className="w-6 h-6 text-purple-600 dark:text-cyan-400" />
                  <Heart className="w-6 h-6 text-purple-600 dark:text-cyan-400" />
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-cyan-400" />
                </div>              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}
