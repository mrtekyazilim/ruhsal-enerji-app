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
      <DialogContent className="rounded-3xl md:rounded-2xl bg-white dark:bg-[#0f1026] border-purple-200/30 dark:border-white/10">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">{title}</DialogTitle>
          {desc && <DialogDescription className="text-slate-600 dark:text-white/70">{desc}</DialogDescription>}
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-2">
          <Button 
            onClick={onCancel} 
            disabled={loading}
            className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 bg-slate-50 dark:bg-transparent border border-slate-300 dark:border-white/20 rounded-xl hover:scale-95 hover:shadow-lg transition-all"
          >
            Vazgeç
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-500/90 hover:bg-red-500 text-white rounded-xl hover:scale-95 hover:shadow-lg transition-all"
          >
            {loading ? "Siliniyor..." : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
