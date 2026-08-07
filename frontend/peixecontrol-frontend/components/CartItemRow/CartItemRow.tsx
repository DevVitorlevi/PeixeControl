"use client";

import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatKg } from "@/lib/formatters";
import type { CartLine } from "@/hooks/useCart";

interface CartItemRowProps {
  line: CartLine;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({
  line,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const subtotal = line.quantitySold * line.pricePerKg;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-3 transition-colors hover:bg-accent/40">
      {/* Linha 1: nome (com espaço total) + remover */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="break-words font-medium leading-snug text-foreground">
            {line.productName}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(line.pricePerKg)}/kg
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remover ${line.productName} do carrinho`}
          onClick={() => onRemove(line.productId)}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Linha 2: stepper + subtotal */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-md border border-border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
            aria-label={`Diminuir quantidade de ${line.productName}`}
            onClick={() =>
              onUpdateQuantity(
                line.productId,
                Number((line.quantitySold - 0.5).toFixed(2)),
              )
            }
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <span className="min-w-[3.5rem] text-center text-sm font-medium tabular-nums text-foreground">
            {formatKg(line.quantitySold)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
            aria-label={`Aumentar quantidade de ${line.productName}`}
            disabled={line.quantitySold >= line.availableQuantity}
            onClick={() =>
              onUpdateQuantity(
                line.productId,
                Number((line.quantitySold + 0.5).toFixed(2)),
              )
            }
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>

        <span className="shrink-0 text-right font-semibold tabular-nums text-primary">
          {formatCurrency(subtotal)}
        </span>
      </div>
    </div>
  );
}
