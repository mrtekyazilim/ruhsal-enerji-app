import { NavLink, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Shapes, Package, Users, LogOut, Menu, X, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useState } from "react"

const pageTitles: Record<string, { title: string; desc: string }> = {
  "/": { title: "Dashboard", desc: "Genel durum ve özet metrikler" },
  "/categories": { title: "Kategoriler", desc: "Hizmet kategorilerini yönetin" },
  "/products": { title: "Ürünler", desc: "Danışman ve hizmetleri yönetin" },
  "/consultants": { title: "Danışmanlar", desc: "Danışmanları yönetin" },
}

export default function AdminLayout() {
  const location = useLocation()
  const page = pageTitles[location.pathname] ?? { title: "Panel", desc: "Yönetim ekranı" }
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden dark:bg-slate-950 bg-white transition-colors duration-300">
      {/* arka plan aurora - dark mode */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-[radial-gradient(900px_500px_at_15%_10%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(800px_450px_at_85%_25%,rgba(236,72,153,0.12),transparent_58%),radial-gradient(900px_600px_at_50%_90%,rgba(34,211,238,0.10),transparent_55%),linear-gradient(180deg,#050613,#0a0b1f)]" />
      <div className="absolute inset-0 -z-10 hidden dark:block opacity-25 bg-[radial-gradient(2px_2px_at_20px_30px,rgba(255,255,255,0.22),transparent_40%),radial-gradient(1px_1px_at_120px_80px,rgba(255,255,255,0.18),transparent_40%),radial-gradient(1px_1px_at_220px_40px,rgba(255,255,255,0.14),transparent_40%)] bg-[length:360px_180px]" />

      {/* arka plan light mode */}
      <div className="absolute inset-0 -z-10 dark:hidden block bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
      <div className="absolute inset-0 -z-10 dark:hidden block opacity-25 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(168,85,247,0.08),transparent_60%),radial-gradient(800px_450px_at_85%_25%,rgba(129,140,248,0.06),transparent_58%)]" />

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* SIDEBAR */}
        <aside className={`fixed md:static inset-y-0 left-0 z-50 w-[280px] border-r border-purple-300/70 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/30 backdrop-blur-md flex flex-col px-1 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-6 right-6 p-2 hover:bg-purple-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-slate-900 dark:text-white" />
          </button>
          {/* Brand */}
          <div className="px-5 py-6 flex items-center gap-3">
            <img src="/logo.png" alt="Ruhsal Enerji" className="h-14 w-14 rounded-2xl" />
            <div className="leading-tight">
              <div className="font-extrabold text-slate-900 dark:text-white">Ruhsal Enerji</div>
              <div className="text-xs text-slate-700 dark:text-slate-400">Admin Panel</div>
            </div>
          </div>

          {/* Section label */}
          <div className="px-5 pb-2 text-[11px] tracking-[0.22em] uppercase text-slate-700 dark:text-slate-500">
            Yönetim
          </div>

          {/* Menu */}
          <nav className="px-3 pb-5 space-y-1">
            <SideLink to="/" icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" end />
            <SideLink to="/categories" icon={<Shapes className="h-4 w-4" />} label="Kategoriler" />
            <SideLink to="/products" icon={<Package className="h-4 w-4" />} label="Ürünler" />
            <SideLink to="/consultants" icon={<Users className="h-4 w-4" />} label="Danışmanlar" />
          </nav>

          {/* Footer */}
          <div className="mt-auto px-5 pb-6">
            <Button
              variant="outline"
              className="w-full border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-900 hover:text-white dark:hover:bg-red-700 dark:hover:text-white transition-colors duration-300"
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/login"
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="p-6 md:p-10 dark:bg-slate-950 bg-white transition-colors duration-300">
          <div className="mx-auto w-full max-w-6xl">
            {/* Top header bar - mobile */}
            <div className="md:hidden mb-6 flex items-center justify-between -mx-6 -mt-6 px-4 py-3 gap-3 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 dark:from-purple-950 dark:via-violet-900 dark:to-indigo-950 rounded-b-2xl">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg transition-colors flex-shrink-0 group"
              >
                <Menu className="h-5 w-5 text-slate-900 dark:text-white group-hover:scale-110 group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-all duration-200" />
              </button>
              
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="h-4 w-4 text-slate-900 dark:text-cyan-400 flex-shrink-0" />
                <span className="text-sm font-serif font-extrabold text-slate-900 dark:text-white truncate">
                  Ruhsal Enerji
                </span>
              </div>
              
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>

            {/* Overlay for mobile menu */}
            {sidebarOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Topbar */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{page.title}</div>
                <div className="text-slate-700 dark:text-slate-400 text-sm">{page.desc}</div>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                <div className="text-xs text-slate-700 dark:text-slate-400 border border-purple-200/50 dark:border-slate-700/50 bg-purple-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl transition-colors duration-300">
                  Aurora • Ruhsal Enerji
                </div>
                <div className="h-10 w-10 rounded-2xl border border-purple-200/50 dark:border-slate-700/50 bg-purple-50 dark:bg-slate-800/50 flex items-center justify-center text-purple-700 dark:text-slate-300 transition-colors duration-300">
                  RE
                </div>
              </div>
            </div>

            {/* Page shell */}
            <div className="relative rounded-3xl border-2 border-purple-300/60 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 md:p-8 shadow-lg dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-all duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-cyan-300/10 pointer-events-none" />
              <div key={location.pathname} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SideLink({
  to,
  label,
  icon,
  end,
}: {
  to: string
  label: string
  icon: React.ReactNode
  end?: boolean
}) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div
          className={[
            "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all border border-transparent",
            isActive
              ? "bg-gradient-to-r from-purple-500/30 via-fuchsia-500/20 to-cyan-400/10 text-purple-700 dark:text-white border-purple-300/50 dark:border-white/10 shadow-[0_12px_40px_rgba(168,85,247,0.25)] dark:bg-gradient-to-r dark:from-purple-500/30 dark:via-fuchsia-500/20 dark:to-cyan-400/10 dark:shadow-[0_12px_40px_rgba(168,85,247,0.25)]"
              : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50",
          ].join(" ")}
        >
          {/* sol aura çizgisi */}
          <span
            className={[
              "mr-1 h-6 w-1 rounded-full transition-opacity",
              isActive
                ? "opacity-100 bg-gradient-to-b from-fuchsia-400 via-purple-400 to-cyan-300"
                : "opacity-0",
            ].join(" ")}
          />

          <span
            className={[
              "transition-transform duration-300",
              isActive ? "scale-110 text-white dark:text-white" : "text-slate-700 dark:text-slate-400 group-hover:scale-105 group-hover:text-slate-900 dark:group-hover:text-slate-200",
            ].join(" ")}
          >
            {icon}
          </span>
          {label}
        </div>
      )}
    </NavLink>
  )
}
