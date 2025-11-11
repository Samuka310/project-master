import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">🚀 Project Master</h1>
          <p className="text-muted-foreground mt-2">
            Template full-stack funcionando!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>✅ Shadcn UI</CardTitle>
              <CardDescription>Componentes instalados</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Botão de Teste</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Tailwind CSS</CardTitle>
              <CardDescription>Dark mode configurado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Clique no ícone de sol/lua no header!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ TanStack Query</CardTitle>
              <CardDescription>Cache e requisições</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Pronto para usar!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
