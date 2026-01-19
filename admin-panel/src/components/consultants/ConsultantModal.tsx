import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { http } from "@/api/http"
import type { Consultant } from "@/pages/Consultants"

interface ConsultantModalProps {
  open: boolean
  initial: Consultant | null
  onClose: () => void
  onDone: () => void
}

export default function ConsultantModal({ open, initial, onClose, onDone }: ConsultantModalProps) {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const [name, setName] = useState(initial?.name ?? "")
  const [title, setTitle] = useState(initial?.title ?? "")
  const [phone, setPhone] = useState(initial?.phone ?? "")
  const [email, setEmail] = useState(initial?.email ?? "")
  const [instagram, setInstagram] = useState(initial?.instagram ?? "")
  const [bio, setBio] = useState(initial?.bio ?? "")
  const [active, setActive] = useState(initial?.active ?? true)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState(initial?.avatarUrl ?? "")

  useEffect(() => {
    if (initial) {
      setName(initial.name)
      setTitle(initial.title ?? "")
      setPhone(initial.phone ?? "")
      setEmail(initial.email ?? "")
      setInstagram(initial.instagram ?? "")
      setBio(initial.bio ?? "")
      setActive(initial.active)
      setAvatarPreview(initial.avatarUrl ?? "")
      setAvatarFile(null)
    }
  }, [initial, open])

  const handleClose = () => {
    if (!loading) {
      setName("")
      setTitle("")
      setPhone("")
      setEmail("")
      setInstagram("")
      setBio("")
      setActive(true)
      setAvatarFile(null)
      setAvatarPreview("")
      setErr(null)
      onClose()
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setErr("Danışman adı gerekli")
      return
    }

    setErr(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name.trim())
      formData.append("title", title.trim() || "")
      formData.append("phone", phone.trim() || "")
      formData.append("email", email.trim() || "")
      formData.append("instagram", instagram.trim() || "")
      formData.append("bio", bio.trim() || "")
      formData.append("active", String(active))

      if (avatarFile) {
        formData.append("avatar", avatarFile)
      }

      if (initial?._id) {
        await http.put(`/consultant/${initial._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await http.post("/consultant", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      handleClose()
      onDone()
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          "İşlem başarısız"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-white/10 bg-white/10 backdrop-blur-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {initial ? "Danışmanı Düzenle" : "Yeni Danışman"}
          </DialogTitle>
          <DialogDescription className="hidden">
            {initial ? "Danışman bilgilerini düzenleyin" : "Yeni danışman oluşturun"}
          </DialogDescription>
        </DialogHeader>

        {err && (
          <div className="rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-200 whitespace-pre-wrap">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Preview */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-white/40 text-center">
                    <div className="text-3xl mb-1">📸</div>
                    <div className="text-xs">Resim yok</div>
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-input"
                className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center cursor-pointer text-white text-xs font-bold"
              >
                +
              </label>
            </div>
          </div>

          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            disabled={loading}
          />

          <div>
            <label className="block text-sm text-white/70 mb-1">Ad *</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Danışman adı"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Ünvan</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="örn: Tarot Uzmanı"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Telefon</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+90 5XX XXX XXXX"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Instagram</label>
            <Input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@instagram_handle"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Hakkında</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault()
                  document.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true }))
                }
              }}
              placeholder="Danışman hakkında bilgi"
              className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-white/70">
              Aktif Durumu
            </label>
            <button
              type="button"
              onClick={() => setActive(!active)}
              disabled={loading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                active
                  ? "bg-gradient-to-r from-purple-500 to-cyan-400 border-transparent"
                  : "bg-white/5 border-white/20"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  active ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-white/10 text-white"
              onClick={handleClose}
              disabled={loading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
              disabled={loading}
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
