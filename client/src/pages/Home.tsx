import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const items = ["Kahve Falı", "Rüyalar", "Tarot", "Nümeroloji", "Şamanik"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Kategoriler</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tüm kategorileri buradan görüntüleyebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((name) => (
          <Card key={name} className="hover:shadow-sm transition">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-slate-900">{name}</div>
              <div className="mt-2 h-1 w-10 rounded bg-slate-900" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
