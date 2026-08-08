"use client";

import { useState } from "react";
import { Fish, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NavLinks } from "@/components/NavLinks/NavLinks";
import { useAuth } from "@/hooks/useAuth";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm md:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
          <Fish className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
        <span className="font-semibold text-foreground">PeixeControl</span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-11 w-11"
        aria-label="Abrir menu de navegação"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-72 flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                <Fish className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              PeixeControl
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 flex flex-1 flex-col justify-between">
            <NavLinks onNavigate={() => setOpen(false)} />

            <div className="mt-6 border-t border-border pt-3 mb-10">
              <Button
                type="button"
                variant="ghost"
                className="h-11 w-full justify-start gap-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sair
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
