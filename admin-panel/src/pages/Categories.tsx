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
      <Card className="border-purple-200/30 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-slate-900 dark:text-white">Kategori Listesi</CardTitle>

          <Button
            variant="ghost"
            className="text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white disabled:opacity-50"
            onClick={fetchCategories}
            disabled={refreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 transition-transform ${refreshing ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-slate-700 dark:text-white/60 text-sm">Yükleniyor...</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-slate-700 dark:text-white/60 text-sm">
              Henüz kategori yok. “Yeni Kategori” ile ekleyebilirsin.
            </div>
          ) : (
            <>
              {/* Desktop view */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="border-b border-purple-200/30 dark:border-white/10 text-slate-700 dark:text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Ad</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Slug</th>
                    <th className="px-4 py-3 text-right whitespace-nowrap">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c) => (
                    <tr
                    key={c._id}
                    className="border-b border-purple-200/20 dark:border-white/5 hover:bg-purple-50 dark:hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{c.name}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-white/60">{c.slug}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        {/* EDIT */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
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
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-3 p-4">
                {rows.map((c) => (
                  <div
                    key={c._id}
                    className="p-4 rounded-xl border border-purple-200/30 dark:border-white/10 bg-purple-50 dark:bg-white/5 hover:bg-purple-100 dark:hover:bg-white/10 transition cursor-pointer"
                    onClick={() => {
                      setSelected(c)
                      setEditOpen(true)
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-white truncate">{c.name}</div>
                        <div className="text-xs text-slate-600 dark:text-white/60 truncate mt-1">{c.slug}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelected(c)
                            setEditOpen(true)
                          }}
                          className="p-1.5 hover:bg-purple-200 dark:hover:bg-white/20 rounded-lg transition"
                        >
                          <Pencil className="h-4 w-4 text-slate-700 dark:text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setDelTarget(c)
                            setDelOpen(true)
                          }}
                          className="p-1.5 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
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
