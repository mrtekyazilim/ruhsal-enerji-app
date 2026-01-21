import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { http } from "@/api/http"

type Category = {
  _id: string
  name: string
  slug: string
}

export default function CategoryModal({
  open,
  onClose,
  onDone,
  initial,
}: {
  open: boolean
  onClose: () => void
  onDone: () => void
  initial?: Category | null
}) {
  const isEdit = !!initial?._id
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setErr(null)
      setName(initial?.name ?? "")
    }
  }, [open, initial])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    setLoading(true)

    try {
      const payload = { name: name.trim() }

      if (isEdit) {
        await http.put(`/categories/admin/${initial!._id}`, payload)
      } else {
        await http.post("/categories/admin", payload)
      }

      onDone()
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          (isEdit ? "Kategori güncellenemedi" : "Kategori eklenemedi")
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl md:rounded-2xl bg-white dark:bg-[#0f1026] border-purple-200/40 dark:border-white/10">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">
            {isEdit ? "Kategoriyi Düzenle" : "Yeni Kategori"}
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-white/60">
            {isEdit ? "Kategori bilgilerini güncelleyin" : "Yeni kategori ekleyin"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Kategori adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-purple-50 dark:bg-white/10 border-purple-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/40"
          />

          {err && (
            <div className="rounded-xl border border-red-300 dark:border-red-500/25 bg-red-50 dark:bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-100/90 whitespace-pre-wrap">
              {err}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" className="flex-1 border-2 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white bg-slate-50 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl hover:scale-95 hover:shadow-lg transition-all duration-200" onClick={onClose} disabled={loading}>
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 text-white rounded-xl hover:shadow-lg hover:scale-95 transition-all duration-200"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
