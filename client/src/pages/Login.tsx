import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Telefon ile Giriş</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="05xx xxx xx xx" inputMode="tel" />
          <Button className="w-full">Devam</Button>
        </CardContent>
      </Card>
    </div>
  );
}
