import { Outlet, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-md px-3 py-2 text-sm transition",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">Ruhsal Enerji</div>
              <div className="text-xs text-slate-500">Client Panel</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NavLink to="/login" className="text-sm text-slate-700 hover:underline">
              Giriş
            </NavLink>
          </div>
        </div>
      </header>

      {/* Shell */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="rounded-xl border bg-white p-3">
            <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Menü
            </div>

            <nav className="space-y-1">
              <NavLink to="/" className={navLinkClass} end>
                Kategoriler
              </NavLink>
              <NavLink to="/category/coffee-fali" className={navLinkClass}>
                Örnek Kategori
              </NavLink>
              <NavLink to="/product/ornek-urun" className={navLinkClass}>
                Örnek Ürün
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="rounded-xl border bg-white p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
