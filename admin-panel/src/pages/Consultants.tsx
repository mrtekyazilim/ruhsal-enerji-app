import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, RefreshCcw } from "lucide-react"
import ConfirmDialog from "@/components/categories/ConfirmDialog"
import ConsultantModal from "@/components/consultants/ConsultantModal"
import { http } from "@/api/http"

export type Consultant = {
  _id: string
  name: string
  title?: string          // ünvan (Tarot Uzmanı vs)
  phone?: string
  email?: string
  instagram?: string
  avatarUrl?: string
  bio?: string
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export default function Consultants() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(searchParams.get("action") === "new")
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<Consultant | null>(null)

  const [delOpen, setDelOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [delTarget, setDelTarget] = useState<Consultant | null>(null)

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [consultants, setConsultants] = useState<Consultant[]>([])

  async function fetchConsultants() {
    setErr(null)
    const isInitial = !consultants.length
    if (isInitial) setLoading(true)
    else setRefreshing(true)
    
    try {
      const res = await http.get("/consultant/admin/all")
      const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
      setConsultants(list)
      // Dashboard'ı da yenile
      localStorage.setItem('dashboardRefresh', Date.now().toString())
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          "Danışmanlar alınamadı"
      )
    } finally {
      if (isInitial) setLoading(false)
      else setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchConsultants()
    // Eğer URL'de action=new varsa, modal'ı aç
    if (searchParams.get("action") === "new") {
      setOpen(true)
      // URL'den parametreyi kaldır
      setSearchParams({})
    }
  }, [])

  const rows = useMemo(() => consultants, [consultants])

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Danışman
        </Button>
      </div>

      {err && (
        <div className="rounded-xl border border-pink-500/25 bg-pink-500/10 p-4 text-sm text-pink-100/90 whitespace-pre-wrap">
          {err}
        </div>
      )}

      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-white">Danışman Listesi</CardTitle>
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white disabled:opacity-50"
            onClick={fetchConsultants}
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
              Henüz danışman yok. “Yeni Danışman” ile ekleyebilirsin.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 text-white/60">
                <tr>
                  <th className="px-4 py-3 text-left">Resim</th>
                  <th className="px-4 py-3 text-left">Ad</th>
                  <th className="px-4 py-3 text-left">Ünvan</th>
                  <th className="px-4 py-3 text-left">İletişim</th>
                  <th className="px-4 py-3 text-left">Durum</th>
                  <th className="px-4 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                        {c.avatarUrl ? (
                          <img src={c.avatarUrl} alt={c.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-lg">👤</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white font-semibold">{c.name}</td>
                    <td className="px-4 py-3 text-white/70">{c.title ?? "—"}</td>
                    <td className="px-4 py-3 text-white/60">
                      {c.phone || c.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const newActive = !c.active
                          // Optimistic update
                          setConsultants(
                            consultants.map((item) =>
                              item._id === c._id ? { ...item, active: newActive } : item
                            )
                          )
                          try {
                            await http.put(`/consultant/${c._id}`, { active: newActive })
                          } catch (e: any) {
                            // Revert on error
                            setConsultants(consultants)
                            const data = e?.response?.data
                            const msg = data?.message || data?.error || e?.message || "Durum güncellenemedi"
                            alert(msg)
                          }
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                          c.active
                            ? "bg-gradient-to-r from-purple-500 to-cyan-400 border-transparent"
                            : "bg-white/5 border-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            c.active ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
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

      {/* create */}
      <ConsultantModal
        open={open}
        initial={null}
        onClose={() => setOpen(false)}
        onDone={() => {
          setOpen(false)
          fetchConsultants()
        }}
      />

      {/* edit */}
      <ConsultantModal
        open={editOpen}
        initial={selected}
        onClose={() => setEditOpen(false)}
        onDone={() => {
          setEditOpen(false)
          setSelected(null)
          fetchConsultants()
        }}
      />

      {/* delete */}
      <ConfirmDialog
        open={delOpen}
        title="Danışmanı sil?"
        desc={delTarget ? `“${delTarget.name}” danışmanı kalıcı olarak silinecek.` : undefined}
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
            await http.delete(`/consultant/${delTarget._id}`)
            setDelOpen(false)
            setDelTarget(null)
            fetchConsultants()
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
