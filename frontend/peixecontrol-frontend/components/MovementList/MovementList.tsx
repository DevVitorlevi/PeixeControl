"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MovementTable } from "@/components/MovementTable/MovementTable";
import { MovementListItem } from "@/components/MovementListItem/MovementListItem";
import {
  MovementListEmpty,
  MovementListError,
  MovementListLoading,
} from "@/components/MovementListStates/MovementListStates";
import { useStockHistory } from "@/hooks/useStockHistory";
import { formatDateForApi, formatKg } from "@/lib/formatters";

function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function MovementList() {
  const today = new Date();
  const todayStr = formatDateForApi(today);

  const [startDate, setStartDate] = useState(() =>
    formatDateForApi(getFirstDayOfMonth(today)),
  );
  const [endDate, setEndDate] = useState(() => todayStr);

  const {
    data: movements,
    isLoading,
    isError,
    refetch,
  } = useStockHistory({ startDate, endDate });

  const { totalEntradas, totalSaidas } = useMemo(() => {
    return (movements ?? []).reduce(
      (acc, movement) => {
        if (movement.type === "Entrada") {
          acc.totalEntradas += movement.quantity;
        } else {
          acc.totalSaidas += movement.quantity;
        }
        return acc;
      },
      { totalEntradas: 0, totalSaidas: 0 },
    );
  }, [movements]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="movement-start">De</Label>
          <Input
            id="movement-start"
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="movement-end">Até</Label>
          <Input
            id="movement-end"
            type="date"
            value={endDate}
            min={startDate}
            max={todayStr}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
            <span className="text-sm text-muted-foreground">
              Total de entradas
            </span>
            <span className="text-2xl font-semibold text-success tabular-nums">
              {formatKg(totalEntradas)}
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
            <span className="text-sm text-muted-foreground">
              Total de saídas
            </span>
            <span className="text-2xl font-semibold text-warning tabular-nums">
              {formatKg(totalSaidas)}
            </span>
          </div>
        </div>
      )}

      {isLoading && <MovementListLoading />}
      {isError && <MovementListError onRetry={() => refetch()} />}

      {!isLoading && !isError && (!movements || movements.length === 0) && (
        <MovementListEmpty />
      )}

      {!isLoading && !isError && movements && movements.length > 0 && (
        <>
          <MovementTable movements={movements} />
          <ul className="flex flex-col gap-3 md:hidden">
            {movements.map((movement, index) => (
              <MovementListItem
                key={movement._id}
                movement={movement}
                index={index}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
