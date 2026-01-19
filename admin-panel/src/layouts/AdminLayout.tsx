import { NavLink, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Shapes, Package, Users, LogOut } from "lucide-react"

const pageTitles: Record<string, { title: string; desc: string }> = {
  "/": { title: "Dashboard", desc: "Genel durum ve özet metrikler" },
  "/categories": { title: "Kategoriler", desc: "Hizmet kategorilerini yönetin" },
  "/products": { title: "Ürünler", desc: "Danışman ve hizmetleri yönetin" },
  "/consultants": { title: "Danışmanlar", desc: "Danışmanları yönetin" },
}

export default function AdminLayout() {
  const location = useLocation()
  const page = pageTitles[location.pathname] ?? { title: "Panel", desc: "Yönetim ekranı" }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* arka plan aurora */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(800px_450px_at_85%_25%,rgba(236,72,153,0.12),transparent_58%),radial-gradient(900px_600px_at_50%_90%,rgba(34,211,238,0.10),transparent_55%),linear-gradient(180deg,#050613,#0a0b1f)]" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[radial-gradient(2px_2px_at_20px_30px,rgba(255,255,255,0.22),transparent_40%),radial-gradient(1px_1px_at_120px_80px,rgba(255,255,255,0.18),transparent_40%),radial-gradient(1px_1px_at_220px_40px,rgba(255,255,255,0.14),transparent_40%)] bg-[length:360px_180px]" />

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* SIDEBAR */}
        <aside className="border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col px-1">
          {/* Brand */}
          <div className="px-5 py-6 flex items-center gap-3">
            <img src="/logo.png" alt="Ruhsal Enerji" className="h-14 w-14 rounded-2xl" />
            <div className="leading-tight">
              <div className="font-extrabold text-white">Ruhsal Enerji</div>
              <div className="text-xs text-white/60">Admin Panel</div>
            </div>
          </div>

          {/* Section label */}
          <div className="px-5 pb-2 text-[11px] tracking-[0.22em] uppercase text-white/40">
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
              className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
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
        <main className="p-6 md:p-10">
          <div className="mx-auto w-full max-w-6xl">
            {/* Topbar */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold text-white">{page.title}</div>
                <div className="text-white/60 text-sm">{page.desc}</div>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="text-xs text-white/50 border border-white/10 bg-white/5 px-3 py-2 rounded-xl">
                  Aurora • Ruhsal Enerji
                </div>
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/80">
                  RE
                </div>
              </div>
            </div>

            {/* Page shell */}
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-400/5 pointer-events-none" />
              <div key={location.pathname} className="animate-in fade-in duration-500">
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
              ? "bg-gradient-to-r from-purple-500/30 via-fuchsia-500/20 to-cyan-400/10 text-white border-white/10 shadow-[0_12px_40px_rgba(168,85,247,0.25)]"
              : "text-white/65 hover:text-white hover:bg-white/5",
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
              "transition-transform duration-300 text-white/80",
              isActive ? "scale-110" : "group-hover:scale-105",
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
