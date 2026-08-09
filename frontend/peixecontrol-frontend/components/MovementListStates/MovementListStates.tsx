import { AlertCircle, ArrowLeftRight, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MovementListLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">Carregando movimentações…</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-16 w-full rounded-lg border border-border bg-linear-to-r from-surface via-muted/70 to-surface bg-size-[200%_100%] motion-safe:animate-shimmer"
        />
      ))}
    </div>
  );
}

export function MovementListEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-10 text-center motion-safe:animate-fade-up">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
        <ArrowLeftRight className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>
      <p className="text-muted-foreground">
        Nenhuma movimentação registrada nesse período.
      </p>
    </div>
  );
}

interface MovementListErrorProps {
  onRetry: () => void;
}

export function MovementListError({ onRetry }: MovementListErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-10 text-center motion-safe:animate-fade-up"
    >
      <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
      <p className="text-foreground">
        Não foi possível carregar as movimentações.
      </p>
      <Button
        variant="outline"
        className="h-11 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={onRetry}
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Tentar novamente
      </Button>
    </div>
  );
}
