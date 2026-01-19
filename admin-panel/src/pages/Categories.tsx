import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, RefreshCcw } from "lucide-react"
import CategoryModal from "@/components/categories/CategoryModal"
import ConfirmDialog from "@/components/categories/ConfirmDialog"
import { http } from "@/api/http"

type Category = {
  _id: string
  name: string
  slug: string
}

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(searchParams.get("action") === "new")

  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<Category | null>(null)

  const [delOpen, setDelOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [delTarget, setDelTarget] = useState<Category | null>(null)

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  async function fetchCategories() {
    setErr(null)
    const isInitial = !categories.length
    if (isInitial) setLoading(true)
    else setRefreshing(true)
    
    try {
      const res = await http.get("/categories")
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
      setCategories(list)
      // Dashboard'ı da yenile
      localStorage.setItem('dashboardRefresh', Date.now().toString())
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          "Kategoriler alınamadı"
      )
    } finally {
      if (isInitial) setLoading(false)
      else setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    // Eğer URL'de action=new varsa, modal'ı aç
    if (searchParams.get("action") === "new") {
      setOpen(true)
      // URL'den parametreyi kaldır
      setSearchParams({})
    }
  }, [])

  const rows = useMemo(() => categories, [categories])

  return (
    <div className="space-y-6">
      {/* üst aksiyon */}
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Kategori
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
          <CardTitle className="text-white">Kategori Listesi</CardTitle>

          <Button
            variant="ghost"
            className="text-white/70 hover:text-white disabled:opacity-50"
            onClick={fetchCategories}
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
              Henüz kategori yok. “Yeni Kategori” ile ekleyebilirsin.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 text-white/60">
                <tr>
                  <th className="px-4 py-3 text-left">Ad</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 text-white">{c.name}</td>
                    <td className="px-4 py-3 text-white/60">{c.slug}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        {/* EDIT */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/70 hover:text-white"
                          onClick={() => {
                            setSelected(c)
                            setEditOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        {/* DELETE */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => {
                            setDelTarget(c)
                            setDelOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* CREATE modal */}
      <CategoryModal
        open={open}
        onClose={() => setOpen(false)}
        initial={null}
        onDone={() => {
          setOpen(false)
          fetchCategories()
        }}
      />

      {/* EDIT modal */}
      <CategoryModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={selected}
        onDone={() => {
          setEditOpen(false)
          setSelected(null)
          fetchCategories()
        }}
      />

      {/* DELETE confirm */}
      <ConfirmDialog
        open={delOpen}
        title="Kategoriyi sil?"
        desc={delTarget ? `“${delTarget.name}” kategorisi kalıcı olarak silinecek.` : undefined}
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
            await http.delete(`/categories/admin/${delTarget._id}`)
            setDelOpen(false)
            setDelTarget(null)
            fetchCategories()
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
