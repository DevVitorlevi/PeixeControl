"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileNav } from "@/components/MobileNav/MobileNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isHydrating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrating && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isHydrating, isAuthenticated, router]);

  if (isHydrating || !isAuthenticated) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-screen w-full items-center justify-center gap-2"
      >
        <Loader2
          className="h-6 w-6 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
        <span className="sr-only">Verificando autenticação…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <Sidebar />
      <MobileNav />
      <div className="md:pl-64">{children}</div>
    </div>
  );
}
