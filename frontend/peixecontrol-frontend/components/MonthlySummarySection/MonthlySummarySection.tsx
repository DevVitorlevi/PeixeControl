"use client";

import { useState } from "react";
import { AlertCircle, CalendarRange, Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaleListItem } from "@/components/SaleListItem/SaleListItem";
import { useMonthlySummary } from "@/hooks/useMonthlySummary";
import { useSalesPdfExport } from "@/hooks/useSalesPdfExport";
import { formatCurrency, formatKg } from "@/lib/formatters";

const PAGE_SIZE = 10;
const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function getCurrentMonthValue(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

export function MonthlySummarySection() {
  const [monthValue, setMonthValue] = useState(getCurrentMonthValue);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [yearStr, monthStr] = monthValue.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);

  const { data, isLoading, isError, isFetching, refetch } = useMonthlySummary(
    month,
    year,
  );
  const { exportPdf, isExporting } = useSalesPdfExport();

  function handleMonthChange(value: string) {
    setMonthValue(value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleExport() {
    if (!data || data.sales.length === 0) return;
    exportPdf({
      title: `Resumo mensal — ${MONTH_NAMES[month - 1]} de ${year}`,
      sales: data.sales,
      totalSalesValue: data.totalSalesValue,
      totalQuantity: data.totalQuantity,
      fileName: `relatorio-mensal-${monthValue}.pdf`,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5 sm:max-w-xs">
          <Label htmlFor="monthly-summary-month">Mês</Label>
          <Input
            id="monthly-summary-month"
            type="month"
            value={monthValue}
            max={getCurrentMonthValue()}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="h-11"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2"
          onClick={handleExport}
          disabled={isExporting || !data || data.sales.length === 0}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="h-4 w-4" aria-hidden="true" />
          )}
          Exportar PDF
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4" aria-busy="true">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-lg bg-primary-light/60" />
            <div className="h-28 animate-pulse rounded-lg bg-primary-light/60" />
          </div>
          <span className="sr-only">Carregando resumo mensal…</span>
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
            Não foi possível carregar o resumo mensal.
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
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
              <span className="text-sm text-muted-foreground">
                Total vendido no mês
              </span>
              <span className="text-2xl font-semibold text-foreground tabular-nums">
                {formatCurrency(data?.totalSalesValue ?? 0)}
              </span>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
              <span className="text-sm text-muted-foreground">
                Total em kg no mês
              </span>
              <span className="text-2xl font-semibold text-foreground tabular-nums">
                {formatKg(data?.totalQuantity ?? 0)}
              </span>
            </div>
          </div>

          {!data || data.sales.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                <CalendarRange
                  className="h-7 w-7 text-primary"
                  aria-hidden="true"
                />
              </div>
              <p className="text-muted-foreground">
                Nenhuma venda registrada neste mês.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                {data.sales.slice(0, visibleCount).map((sale) => (
                  <SaleListItem key={sale._id} sale={sale} />
                ))}
              </div>

              {visibleCount < data.sales.length && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-11"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                >
                  Carregar mais ({data.sales.length - visibleCount} restantes)
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
