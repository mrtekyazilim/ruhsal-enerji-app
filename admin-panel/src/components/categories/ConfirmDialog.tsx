import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ConfirmDialog({
  open,
  title,
  desc,
  confirmText = "Sil",
  loading,
  onCancel,
  onConfirm,
}: {
  open: boolean
  title: string
  desc?: string
  confirmText?: string
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="bg-[#0f1026] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          {desc && <DialogDescription className="text-white/70">{desc}</DialogDescription>}
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Vazgeç
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-500/90 hover:bg-red-500 text-white"
          >
            {loading ? "Siliniyor..." : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
