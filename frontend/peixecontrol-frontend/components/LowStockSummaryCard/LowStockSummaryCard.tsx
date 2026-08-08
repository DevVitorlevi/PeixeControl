"use client";

import Link from "next/link";
import { AlertTriangle, PackageSearch } from "lucide-react";

import { useLowStock } from "@/hooks/useLowStock";

export function LowStockSummaryCard() {
  const { data, isLoading, isError } = useLowStock();

  const count = data?.length ?? 0;
  const hasLowStock = count > 0;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            hasLowStock ? "bg-destructive" : "bg-primary-light"
          }`}
        >
          {hasLowStock ? (
            <AlertTriangle
              className="h-5 w-5 text-destructive-foreground"
              aria-hidden="true"
            />
          ) : (
            <PackageSearch
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">
            {isLoading
              ? "Verificando estoque…"
              : isError
                ? "Não foi possível verificar o estoque"
                : hasLowStock
                  ? `${count} produto${count > 1 ? "s" : ""} com estoque baixo`
                  : "Nenhum produto com estoque baixo"}
          </p>
          <p className="text-sm text-muted-foreground">
            Alerta automático abaixo de 5kg
          </p>
        </div>
      </div>

      <Link
        href="/stock"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Ver no Estoque
      </Link>
    </div>
  );
}
