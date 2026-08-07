"use client";

import { Fish, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/NavLinks/NavLinks";
import { useAuth } from "@/hooks/useAuth";

export function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface md:flex">
      <div className="flex items-center gap-2 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
          <Fish className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <span className="text-lg font-semibold text-foreground">
          PeixeControl
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks />
      </div>

      <div className="border-t border-border p-3">
        <div className="mb-2 truncate px-2 text-xs text-muted-foreground">
          {user?.name ?? "Usuário"}
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-11 w-full justify-start gap-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
