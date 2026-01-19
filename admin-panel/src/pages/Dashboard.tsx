import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shapes, Package, Sparkles, RefreshCcw, Plus } from "lucide-react"
import { http } from "@/api/http"
import { useNavigate } from "react-router-dom"
import type { Consultant } from "@/pages/Consultants"

type Category = { _id: string; name: string; slug: string; createdAt?: string; updatedAt?: string }
type Product = { _id: string; name?: string; title?: string; slug?: string; price?: number; createdAt?: string; updatedAt?: string }

export default function Dashboard() {
  const nav = useNavigate()

  const [refreshing, setRefreshing] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [consultants, setConsultants] = useState<Consultant[]>([])

  async function fetchAll() {
    setErr(null)
    setRefreshing(true)
    try {
      const [catRes, prodRes, consRes] = await Promise.all([
        http.get("/categories"),
        http.get("/products"),
        http.get("/consultant/admin/all"),
      ])

      const catList = Array.isArray(catRes.data) ? catRes.data : (catRes.data?.data ?? [])
      const prodList = Array.isArray(prodRes.data) ? prodRes.data : (prodRes.data?.data ?? [])
      const consList = Array.isArray(consRes.data) ? consRes.data : (consRes.data?.data ?? [])

      setCategories(catList)
      setProducts(prodList)
      setConsultants(consList)
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          "Dashboard verileri alınamadı"
      )
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAll()
    
    // Diğer sayfalardan Dashboard refresh trigger'ını listen et
    const handleStorageChange = () => {
      fetchAll()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const categoryCount = categories.length
  const productCount = products.length
  const activeConsultants = consultants.filter((c) => c.active)

  const latestCategories = useMemo(() => {
    return [...categories]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 5)
  }, [categories])

  const latestProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 5)
  }, [products])

  return (
    <div className="space-y-6">
      {/* üst bar */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          className="text-white/70 hover:text-white disabled:opacity-50"
          onClick={fetchAll}
          disabled={refreshing}
        >
          <RefreshCcw className={`h-4 w-4 mr-2 transition-transform ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Yenileniyor..." : "Yenile"}
        </Button>
      </div>

      {err && (
        <div className="rounded-xl border border-pink-500/25 bg-pink-500/10 p-4 text-sm text-pink-100/90 whitespace-pre-wrap animate-in fade-in duration-300">
          {err}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          title="Kategoriler"
          value={String(categoryCount)}
          icon={<Shapes className="h-5 w-5" />}
        />
        <Stat
          title="Ürünler"
          value={String(productCount)}
          icon={<Package className="h-5 w-5" />}
        />
        <Stat
          title="Aktif Danışman"
          value={String(activeConsultants.length)}
          consultants={activeConsultants}
          icon={<Sparkles className="h-5 w-5" />}
        />
      </div>

      {/* Quick actions + latest */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              onClick={() => nav("/categories?action=new")}
              className="w-full rounded-xl border border-white/15 bg-gradient-to-br from-purple-600/20 to-transparent hover:from-purple-600/40 transition-all p-4 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/20 p-2 group-hover:bg-purple-500/30 transition">
                  <Shapes className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Yeni Kategori</div>
                  <div className="text-xs text-white/60">Hızlıca ekleyin</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => nav("/products?action=new")}
              className="w-full rounded-xl border border-white/15 bg-gradient-to-br from-cyan-600/20 to-transparent hover:from-cyan-600/40 transition-all p-4 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/20 p-2 group-hover:bg-cyan-500/30 transition">
                  <Package className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Yeni Ürün</div>
                  <div className="text-xs text-white/60">Ekleyin ve kaydedin</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => nav("/consultants?action=new")}
              className="w-full rounded-xl border border-white/15 bg-gradient-to-br from-fuchsia-600/20 to-transparent hover:from-fuchsia-600/40 transition-all p-4 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-fuchsia-500/20 p-2 group-hover:bg-fuchsia-500/30 transition">
                  <Plus className="h-5 w-5 text-fuchsia-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Yeni Danışman</div>
                  <div className="text-xs text-white/60">Profil oluşturun</div>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Son Eklenenler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs tracking-widest uppercase text-white/40 mb-3">
                Ürünler
              </div>
              {latestProducts.length === 0 ? (
                <div className="text-sm text-white/60">Henüz ürün yok.</div>
              ) : (
                <div className="space-y-2">
                  {latestProducts.map((p) => {
                    const title = p.name || p.title || "—"
                    return (
                      <button
                        key={p._id}
                        onClick={() => nav("/products")}
                        className="w-full rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-600/10 to-transparent hover:from-cyan-600/20 hover:border-cyan-500/50 transition-all p-3 text-left group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white group-hover:text-cyan-200 transition">
                              {title}
                            </div>
                            <div className="text-xs text-white/50">{p.slug ?? "—"}</div>
                          </div>
                          <Package className="h-4 w-4 text-cyan-300/50 group-hover:text-cyan-300 transition flex-shrink-0" />
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="text-xs tracking-widest uppercase text-white/40 mb-3">
                Kategoriler
              </div>
              {latestCategories.length === 0 ? (
                <div className="text-sm text-white/60">Henüz kategori yok.</div>
              ) : (
                <div className="space-y-2">
                  {latestCategories.map((c) => (
                    <button
                      key={c._id}
                      onClick={() => nav("/categories")}
                      className="w-full rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-600/10 to-transparent hover:from-purple-600/20 hover:border-purple-500/50 transition-all p-3 text-left group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-purple-200 transition">
                            {c.name}
                          </div>
                          <div className="text-xs text-white/50">{c.slug}</div>
                        </div>
                        <Shapes className="h-4 w-4 text-purple-300/50 group-hover:text-purple-300 transition flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({
  title,
  value,
  icon,
  valueClass,
  consultants,
}: {
  title: string
  value: string
  icon: React.ReactNode
  valueClass?: string
  consultants?: Consultant[]
}) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="flex-1">
          <div className="text-white/60 text-sm">{title}</div>
          <div className={["text-3xl font-extrabold text-white mt-1", valueClass].filter(Boolean).join(" ")}>
            {consultants && consultants.length > 0 ? (
              <div className="flex gap-3">
                {consultants.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {c.avatarUrl ? (
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="h-8 w-8 rounded-full object-cover border-2 border-white/30 hover:border-white/60 transition flex-shrink-0"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-xs text-white/60 font-semibold flex-shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-white/80">{c.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              value
            )}
          </div>
        </div>
        <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 flex-shrink-0">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
