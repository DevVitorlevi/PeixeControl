import { AlertCircle, Fish, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductListLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">Carregando produtos...</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-16 w-full animate-pulse rounded-lg border border-border bg-surface"
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
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-10 text-center">
      <Fish className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      {hasActiveSearch ? (
        <p className="text-muted-foreground">
          Nenhum produto encontrado para &quot;{searchTerm}&quot;.
        </p>
      ) : (
        <p className="text-muted-foreground">
          Nenhum produto cadastrado ainda.
        </p>
      )}
    </div>
  );
}

interface ProductListErrorProps {
  onRetry: () => void;
}

export function ProductListError({ onRetry }: ProductListErrorProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-10 text-center">
      <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
      <p className="text-foreground">Não foi possível carregar os produtos.</p>
      <Button variant="outline" className="h-11 gap-2" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Tentar novamente
      </Button>
    </div>
  );
}
