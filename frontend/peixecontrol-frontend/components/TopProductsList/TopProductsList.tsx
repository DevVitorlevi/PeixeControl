"use client";

import { useState } from "react";
import { AlertCircle, Trophy, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTopProducts } from "@/hooks/useTopProducts";
import { formatCurrency, formatDateForApi, formatKg } from "@/lib/formatters";

export function TopProductsList() {
  const [date, setDate] = useState("");
  const todayStr = formatDateForApi(new Date());

  const { data, isLoading, isError, isFetching, refetch } = useTopProducts(
    date || undefined,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 sm:max-w-xs">
        <Label htmlFor="top-products-date">Filtrar por dia (opcional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="top-products-date"
            type="date"
            value={date}
            max={todayStr}
            onChange={(e) => setDate(e.target.value)}
            className="h-11"
          />
          {date && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Limpar filtro de data"
              onClick={() => setDate("")}
              className="h-11 w-11 shrink-0"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg bg-primary-light/60"
            />
          ))}
          <span className="sr-only">Carregando produtos mais vendidos…</span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive">
            <AlertCircle
              className="h-7 w-7 text-destructive-foreground"
              aria-hidden="true"
            />
          </div>
          <p className="text-muted-foreground">
            Não foi possível carregar os produtos mais vendidos.
          </p>
          <Button
            type="button"
            variant="outline"
            className="h-11"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            Tentar novamente
          </Button>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
            <Trophy className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>
          <p className="text-muted-foreground">
            {date
              ? "Nenhuma venda registrada nesse dia."
              : "Nenhuma venda registrada ainda."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((product, index) => (
            <div
              key={product._id}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-semibold text-primary tabular-nums">
                {index + 1}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-medium text-foreground">
                  {product.productName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatKg(product.totalQuantity)} vendidos
                </span>
              </div>
              <span className="shrink-0 font-semibold text-foreground tabular-nums">
                {formatCurrency(product.totalSalesValue)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
