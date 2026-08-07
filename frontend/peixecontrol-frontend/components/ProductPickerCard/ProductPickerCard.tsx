"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatKg } from "@/lib/formatters";
import type { Product } from "@/types/stock";

interface ProductPickerCardProps {
  product: Product;
  isLowStock: boolean;
  onAdd: (product: Product, quantity: number) => void;
}

export function ProductPickerCard({
  product,
  isLowStock,
  onAdd,
}: ProductPickerCardProps) {
  const isOutOfStock = product.quantity <= 0;
  const [quantity, setQuantity] = useState(() => Math.min(1, product.quantity));

  function clamp(value: number) {
    if (Number.isNaN(value)) return 0;
    return Math.max(0, Math.min(value, product.quantity));
  }

  function handleAdd() {
    if (quantity <= 0) return;
    onAdd(product, quantity);
    setQuantity(Math.min(1, product.quantity));
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-elevation transition-shadow hover:shadow-elevation-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{product.name}</span>
          {isLowStock && (
            <span className="text-xs font-medium text-destructive">
              estoque baixo
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {formatKg(product.quantity)} disponível ·{" "}
          {formatCurrency(product.pricePerKg)}/kg
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Diminuir quantidade"
            disabled={isOutOfStock}
            onClick={() =>
              setQuantity((q) => clamp(Number((q - 0.5).toFixed(2))))
            }
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Input
            type="number"
            name={`quantity-${product._id}`}
            inputMode="decimal"
            step="0.1"
            min="0"
            max={product.quantity}
            aria-label={`Quantidade de ${product.name} em kg`}
            className="h-11 w-20 border-x border-y-0 border-border text-center tabular-nums"
            value={quantity}
            disabled={isOutOfStock}
            onChange={(event) => setQuantity(clamp(Number(event.target.value)))}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Aumentar quantidade"
            disabled={isOutOfStock}
            onClick={() =>
              setQuantity((q) => clamp(Number((q + 0.5).toFixed(2))))
            }
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <Button
          type="button"
          className="h-11 gap-2"
          disabled={isOutOfStock || quantity <= 0}
          onClick={handleAdd}
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          {isOutOfStock ? "Sem estoque" : "Adicionar"}
        </Button>
      </div>
    </div>
  );
}
