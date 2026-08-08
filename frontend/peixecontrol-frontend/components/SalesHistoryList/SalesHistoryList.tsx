"use client";

import { AlertCircle, Receipt } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSalesHistory } from "@/hooks/useSalesHistory";
import { formatCurrency, formatKg, formatTime } from "@/lib/formatters";

interface SalesHistoryListProps {
  date: string;
}

export function SalesHistoryList({ date }: SalesHistoryListProps) {
  const {
    data: sales,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSalesHistory(date);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-primary-light/60"
          />
        ))}
        <span className="sr-only">Carregando vendas do dia…</span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive">
          <AlertCircle
            className="h-7 w-7 text-destructive-foreground"
            aria-hidden="true"
          />
        </div>
        <p className="text-muted-foreground">
          Não foi possível carregar as vendas deste dia.
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
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
          <Receipt className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <p className="text-muted-foreground">
          Nenhuma venda registrada neste dia.
        </p>
      </div>
    );
  }

  const totalDoDia = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {sales.map((sale) => {
          const itemsSummary = sale.items
            .map(
              (item) => `${item.productName} (${formatKg(item.quantitySold)})`,
            )
            .join(", ");

          return (
            <div
              key={sale._id}
              className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground tabular-nums">
                    {formatTime(sale.saleDate)}
                  </span>
                  <Badge variant="secondary">{sale.paymentMethod}</Badge>
                </div>
                <span className="font-semibold text-foreground tabular-nums">
                  {formatCurrency(sale.total)}
                </span>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {itemsSummary}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-primary-light px-4 py-3">
        <span className="font-medium text-foreground">Total do dia</span>
        <span className="text-lg font-semibold text-foreground tabular-nums">
          {formatCurrency(totalDoDia)}
        </span>
      </div>
    </div>
  );
}
