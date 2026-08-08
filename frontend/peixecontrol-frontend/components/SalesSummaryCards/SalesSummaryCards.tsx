"use client";

import { useState } from "react";
import { AlertCircle, Banknote, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSalesSummary } from "@/hooks/useSalesSummary";
import { formatCurrency, formatDateForApi, formatKg } from "@/lib/formatters";

function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function SalesSummaryCards() {
  const today = new Date();
  const todayStr = formatDateForApi(today);

  const [startDate, setStartDate] = useState(() =>
    formatDateForApi(getFirstDayOfMonth(today)),
  );
  const [endDate, setEndDate] = useState(() => todayStr);

  const { data, isLoading, isError, isFetching, refetch } = useSalesSummary(
    startDate,
    endDate,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sales-summary-start">De</Label>
          <Input
            id="sales-summary-start"
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sales-summary-end">Até</Label>
          <Input
            id="sales-summary-end"
            type="date"
            value={endDate}
            min={startDate}
            max={todayStr}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-busy="true">
          <div className="h-28 animate-pulse rounded-lg bg-primary-light/60" />
          <div className="h-28 animate-pulse rounded-lg bg-primary-light/60" />
          <span className="sr-only">Carregando resumo de vendas…</span>
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
            Não foi possível carregar o resumo de vendas.
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
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Banknote
                className="h-4 w-4 text-brand-secondary"
                aria-hidden="true"
              />
              <span className="text-sm">Total vendido</span>
            </div>
            <span className="text-2xl font-semibold text-foreground tabular-nums">
              {formatCurrency(data?.totalSalesValue ?? 0)}
            </span>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Scale
                className="h-4 w-4 text-brand-secondary"
                aria-hidden="true"
              />
              <span className="text-sm">Total em kg</span>
            </div>
            <span className="text-2xl font-semibold text-foreground tabular-nums">
              {formatKg(data?.totalQuantity ?? 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
