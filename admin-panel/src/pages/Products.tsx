import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, RefreshCcw } from "lucide-react"
import ConfirmDialog from "@/components/categories/ConfirmDialog"
import ProductModal from "@/components/products/ProductModal"
import { http } from "@/api/http"

type Product = {
  _id: string
  title: string
  slug: string
  price?: number
  stock?: number
  currency?: string
  categoryId?: { _id: string; name: string; slug: string } | string
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(searchParams.get("action") === "new")

  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)

  const [delOpen, setDelOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [delTarget, setDelTarget] = useState<Product | null>(null)

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  async function fetchProducts() {
    setErr(null)
    const isInitial = !products.length
    if (isInitial) setLoading(true)
    else setRefreshing(true)
    
    try {
      const res = await http.get("/products/admin/all")
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
      setProducts(list)
      // Dashboard'ı da yenile
      localStorage.setItem('dashboardRefresh', Date.now().toString())
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          "Ürünler alınamadı"
      )
    } finally {
      if (isInitial) setLoading(false)
      else setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // Eğer URL'de action=new varsa, modal'ı aç
    if (searchParams.get("action") === "new") {
      setOpen(true)
      // URL'den parametreyi kaldır
      setSearchParams({})
    }
  }, [])

  const rows = useMemo(() => products, [products])

  return (
    <div className="space-y-6">
      {/* üst aksiyon */}
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Ürün
        </Button>
      </div>

      {err && (
        <div className="rounded-xl border border-pink-500/25 bg-pink-500/10 p-4 text-sm text-pink-100/90 whitespace-pre-wrap">
          {err}
        </div>
      )}

      {/* tablo */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-white">Ürün Listesi</CardTitle>

          <Button
            variant="ghost"
            className="text-white/70 hover:text-white disabled:opacity-50"
            onClick={fetchProducts}
            disabled={refreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 transition-transform ${refreshing ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-white/60 text-sm">Yükleniyor...</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-white/60 text-sm">
              Henüz ürün yok. “Yeni Ürün” ile ekleyebilirsin.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 text-white/60">
                <tr>
                  <th className="px-4 py-3 text-left">Başlık</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-left">Kategori</th>
                  <th className="px-4 py-3 text-right">Fiyat</th>
                  <th className="px-4 py-3 text-right">Stok</th>
                  <th className="px-4 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => {
                  const catName =
                    typeof p.categoryId === "string"
                      ? p.categoryId
                      : p.categoryId?.name || "—"

                  return (
                    <tr
                      key={p._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-3 text-white font-semibold">
                        {p.title}
                      </td>
                      <td className="px-4 py-3 text-white/60">{p.slug}</td>
                      <td className="px-4 py-3 text-white/70">{catName}</td>
                      <td className="px-4 py-3 text-right text-white">{p.price?.toFixed(2)} {p.currency || "TRY"}</td>
                      <td className="px-4 py-3 text-right text-white">{p.stock}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white/70 hover:text-white"
                            onClick={() => {
                              setSelected(p)
                              setEditOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => {
                              setDelTarget(p)
                              setDelOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* CREATE modal */}
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        initial={null}
        onDone={() => {
          setOpen(false)
          fetchProducts()
        }}
      />

      {/* EDIT modal */}
      <ProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={selected}
        onDone={() => {
          setEditOpen(false)
          setSelected(null)
          fetchProducts()
        }}
      />

      {/* DELETE confirm */}
      <ConfirmDialog
        open={delOpen}
        title="Ürünü sil?"
        desc={delTarget ? `“${delTarget.title}” ürünü kalıcı olarak silinecek.` : undefined}
        loading={delLoading}
        onCancel={() => {
          if (!delLoading) {
            setDelOpen(false)
            setDelTarget(null)
          }
        }}
        onConfirm={async () => {
          if (!delTarget?._id) return
          setDelLoading(true)
          try {
            await http.delete(`/products/admin/${delTarget._id}`)
            setDelOpen(false)
            setDelTarget(null)
            fetchProducts()
          } catch (e: any) {
            const data = e?.response?.data
            alert(data?.message || data?.error || e?.message || "Silme başarısız")
          } finally {
            setDelLoading(false)
          }
        }}
      />
    </div>
  )
}
