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

type Product = {
  _id: string
  title: string
  slug: string
  price?: number
  stock?: number
  currency?: string
  images?: string[]
  categoryId?: any
}

export default function ProductModal({
  open,
  onClose,
  onDone,
  initial,
}: {
  open: boolean
  onClose: () => void
  onDone: () => void
  initial?: Product | null
}) {
  const isEdit = !!initial?._id

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState<string>("")
  const [stock, setStock] = useState<string>("")
  const [currency, setCurrency] = useState<string>("TRY")
  const [categoryId, setCategoryId] = useState<string>("")
  const [images, setImages] = useState<string[]>([])

  const [cats, setCats] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return

    setErr(null)
    setTitle(initial?.title ?? "")
    setPrice(initial?.price != null ? String(initial.price) : "")
    setStock(initial?.stock != null ? String(initial.stock) : "0")
    setCurrency(initial?.currency ?? "TRY")
    setImages(initial?.images ?? [])

    const initCatId =
      typeof initial?.categoryId === "string"
        ? initial.categoryId
        : initial?.categoryId?._id ?? ""
    setCategoryId(initCatId)

    ;(async () => {
      try {
        const res = await http.get("/categories")
        const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
        setCats(list)
      } catch (e) {
        // kategori çekemezsek bile modal açılabilir
        setCats([])
      }
    })()
  }, [open, initial])

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i])
      }

      const res = await http.post("/products/admin/upload", formData)

      if (res.data?.urls) {
        setImages([...images, ...res.data.urls])
      }
      e.target.value = ""
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Görsel yüklenemedi")
    } finally {
      setUploading(false)
    }
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    setLoading(true)

    try {
      // title zorunlu
      if (!title.trim()) {
        setErr("Başlık boş olamaz")
        setLoading(false)
        return
      }

      const payload: any = {
        title: title.trim(),
      }

      // kategori opsiyonel
      if (categoryId.trim()) {
        payload.categoryId = categoryId
      }

      // fiyat zorunlu
      if (!price.trim()) {
        setErr("Fiyat boş olamaz")
        setLoading(false)
        return
      }
      payload.price = Number(price)
      payload.currency = currency

      // stok zorunlu
      if (!stock.trim()) {
        setErr("Stok boş olamaz")
        setLoading(false)
        return
      }
      const stockNum = Number(stock)
      if (!Number.isInteger(stockNum) || stockNum < 0) {
        setErr("Stok sayı olmalı ve negatif olamaz")
        setLoading(false)
        return
      }
      payload.stock = stockNum

      if (images.length > 0) {
        payload.images = images
      }

      console.log("PAYLOAD =>", payload)

      if (isEdit) {
        await http.put(`/products/admin/${initial!._id}`, payload)
      } else {
        await http.post("/products/admin", payload)
      }

      onDone()
    } catch (e: any) {
      const data = e?.response?.data
      setErr(
        data?.message ||
          data?.error ||
          (data ? JSON.stringify(data, null, 2) : null) ||
          e?.message ||
          (isEdit ? "Ürün güncellenemedi" : "Ürün eklenemedi")
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
            {isEdit ? "Ürünü Düzenle" : "Yeni Ürün"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {isEdit ? "Ürün bilgilerini güncelleyin" : "Yeni ürün ekleyin"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Ürün başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40"
          />

          <Input
            type="number"
            placeholder="Fiyat"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40"
          />

          <Input
            placeholder="Stok"
            inputMode="numeric"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40"
          />

          <div className="space-y-1">
            <div className="text-xs text-white/60">Para Birimi</div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-white outline-none"
            >
              <option value="TRY" className="text-black">TRY (₺)</option>
              <option value="USD" className="text-black">USD ($)</option>
              <option value="EUR" className="text-black">EUR (€)</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-white/60">Görseller (İsteğe Bağlı)</div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-xs text-white/50">
              <div className="font-semibold text-white/60 mb-2">Kurallar:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li>Formatlar: JPEG, PNG, WebP, GIF</li>
                <li>Max dosya boyutu: 5MB</li>
                <li>Max 5 görsel aynı anda</li>
              </ul>
            </div>
            <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-white/40 transition">
              <span className="text-sm text-white/60">Görselleri seçin (max 5)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {images.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={url}
                      alt={`upload-${idx}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-xs text-white/60">Kategori</div>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-white outline-none"
            >
              <option value="">Kategori seç (opsiyonel)</option>
              {cats.map((c) => (
                <option key={c._id} value={c._id} className="text-black">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {err && (
            <div className="rounded-xl border border-pink-500/25 bg-pink-500/10 p-3 text-sm text-pink-100/90 whitespace-pre-wrap">
              {err}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading || uploading}>
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading || !title.trim() || !price.trim() || !stock.trim()}
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
