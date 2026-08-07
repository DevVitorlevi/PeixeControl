import { formatCurrency, formatKg } from "@/lib/formatters";
import { LowStockBadge } from "../LowStockBadge/LowStockBadge";
import { EditProductDialog } from "../EditProductDialog/EditProductDialog";
import { DeleteProductDialog } from "../DeleteProductDialog/DeleteProductDialog";
import type { Product } from "@/types/stock";

interface ProductListItemProps {
  product: Product;
  isLowStock: boolean;
  index?: number;
}

export function ProductListItem({
  product,
  isLowStock,
  index = 0,
}: ProductListItemProps) {
  return (
    <li
      className="motion-safe:animate-fade-up flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 shadow-elevation transition-shadow hover:shadow-elevation-md"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-foreground">{product.name}</span>
        {isLowStock ? (
          <LowStockBadge />
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="h-1.5 w-1.5 rounded-full bg-success"
              aria-hidden="true"
            />
            Normal
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Quantidade</span>
        <span
          className={
            isLowStock
              ? "tabular-nums text-base font-semibold text-destructive"
              : "tabular-nums text-base font-semibold text-foreground"
          }
        >
          {formatKg(product.quantity)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Preço/kg</span>
        <span className="tabular-nums font-medium text-foreground">
          {formatCurrency(product.pricePerKg)}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-end gap-1 border-t border-border pt-2">
        <EditProductDialog product={product} />
        <DeleteProductDialog product={product} />
      </div>
    </li>
  );
}
