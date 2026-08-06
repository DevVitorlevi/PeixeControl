"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardHomePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.replace("/login");
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold">
          Bem-vindo, {user?.name ?? "usuário"}
        </h1>
        <p className="text-muted-foreground">
          Módulos de estoque, vendas e relatórios entram nas próximas etapas.
        </p>
      </div>
      <Button variant="outline" className="h-11" onClick={handleSignOut}>
        Sair
      </Button>
    </main>
  );
}
