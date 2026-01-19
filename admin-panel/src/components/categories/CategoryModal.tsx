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
      <DialogContent className="bg-[#0f1026] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEdit ? "Kategoriyi Düzenle" : "Yeni Kategori"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {isEdit ? "Kategori bilgilerini güncelleyin" : "Yeni kategori ekleyin"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Kategori adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40"
          />

          {err && (
            <div className="rounded-xl border border-pink-500/25 bg-pink-500/10 p-3 text-sm text-pink-100/90 whitespace-pre-wrap">
              {err}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading || !name.trim()}
              className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 text-white"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
