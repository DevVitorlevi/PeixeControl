import { AlertCircle, Fish, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductListLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">Carregando produtos…</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-16 w-full rounded-lg border border-border bg-linear-to-r from-surface via-muted/70 to-surface bg-size-[200%_100%] motion-safe:animate-shimmer"
        />
      ))}
    </div>
  );
}

interface ProductListEmptyProps {
  hasActiveSearch: boolean;
  searchTerm?: string;
}

export function ProductListEmpty({
  hasActiveSearch,
  searchTerm,
}: ProductListEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-10 text-center motion-safe:animate-fade-up">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
        <Fish className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>
      {hasActiveSearch ? (
        <p className="text-muted-foreground">
          Nenhum produto encontrado para &ldquo;{searchTerm}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          <p className="font-medium text-foreground">
            Nenhum produto cadastrado ainda
          </p>
          <p className="text-sm text-muted-foreground">
            Use o botão &ldquo;Novo produto&rdquo; para começar.
          </p>
        </div>
      )}
    </div>
  );
}

interface ProductListErrorProps {
  onRetry: () => void;
}

export function ProductListError({ onRetry }: ProductListErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-10 text-center motion-safe:animate-fade-up"
    >
      <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
      <p className="text-foreground">Não foi possível carregar os produtos.</p>
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
