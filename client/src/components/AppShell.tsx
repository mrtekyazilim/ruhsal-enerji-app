import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-md px-3 py-2 text-sm transition",
    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
  ].join(" ");

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      <NavLink to="/" className={linkClass} end onClick={onNavigate}>
        Kategoriler
      </NavLink>
      {/* örnek linkler; sonra dinamikleştiririz */}
      <NavLink to="/category/kahve-fali" className={linkClass} onClick={onNavigate}>
        Örnek Kategori
      </NavLink>
      <NavLink to="/product/ornek-urun" className={linkClass} onClick={onNavigate}>
        Örnek Ürün
      </NavLink>
    </nav>
  );
}

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">Menü</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <div className="mb-4">
                    <div className="text-sm font-semibold">Ruhsal Enerji</div>
                    <div className="text-xs text-slate-500">Client Panel</div>
                  </div>
                  <Separator className="mb-3" />
                  <SidebarNav onNavigate={() => {}} />
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden md:block h-8 w-8 rounded-lg bg-slate-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">Ruhsal Enerji</div>
              <div className="text-xs text-slate-500">Client Panel</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <NavLink to="/login">Giriş</NavLink>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-slate-300">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>RE</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Çıkış</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6">
        {/* Sidebar desktop */}
        <aside className="col-span-12 hidden md:block md:col-span-3 lg:col-span-2">
          <div className="rounded-xl border bg-white p-3">
            <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Menü
            </div>
            <SidebarNav />
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
