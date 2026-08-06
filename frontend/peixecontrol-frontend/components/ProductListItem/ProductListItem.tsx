import { formatCurrency, formatKg } from "@/lib/formatters";
import { LowStockBadge } from "../LowStockBadge/LowStockBadge";
import type { Product } from "@/types/stock";

interface ProductListItemProps {
  product: Product;
  isLowStock: boolean;
}

export function ProductListItem({ product, isLowStock }: ProductListItemProps) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-foreground">{product.name}</span>
        {isLowStock && <LowStockBadge />}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Quantidade</span>
        <span
          className={
            isLowStock
              ? "text-base font-semibold text-destructive"
              : "text-base font-semibold text-foreground"
          }
        >
          {formatKg(product.quantity)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Preço/kg</span>
        <span className="font-medium text-foreground">
          {formatCurrency(product.pricePerKg)}
        </span>
      </div>
    </li>
  );
}
