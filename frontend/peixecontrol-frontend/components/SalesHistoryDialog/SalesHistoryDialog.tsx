"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SalesHistoryList } from "@/components/SalesHistoryList/SalesHistoryList";
import { formatDate, formatDateForApi } from "@/lib/formatters";

function addDays(date: Date, delta: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function SalesHistoryDialog() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) setSelectedDate(new Date());
  }

  function handlePrevDay() {
    setSelectedDate((prev) => addDays(prev, -1));
  }

  function handleNextDay() {
    setSelectedDate((prev) => (isToday(prev) ? prev : addDays(prev, 1)));
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-11 gap-2"
        onClick={() => setOpen(true)}
      >
        <History className="h-4 w-4" aria-hidden="true" />
        Vendas de hoje
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none p-4 sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-lg sm:rounded-lg sm:p-6">
          <DialogHeader>
            <DialogTitle>Histórico de vendas</DialogTitle>
            <DialogDescription>
              Vendas registradas no dia selecionado.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between border-b border-border py-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Ver dia anterior"
              onClick={handlePrevDay}
              className="h-11 w-11"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>

            <span
              className="font-medium text-foreground tabular-nums"
              aria-live="polite"
            >
              {formatDate(selectedDate)}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Ver próximo dia"
              onClick={handleNextDay}
              disabled={isToday(selectedDate)}
              className="h-11 w-11"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <SalesHistoryList date={formatDateForApi(selectedDate)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
