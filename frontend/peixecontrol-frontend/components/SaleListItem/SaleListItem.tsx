import { Badge } from "@/components/ui/badge";
import type { Sale } from "@/types/sales";
import { formatCurrency, formatKg, formatTime } from "@/lib/formatters";

interface SaleListItemProps {
  sale: Sale;
}

export function SaleListItem({ sale }: SaleListItemProps) {
  const itemsSummary = sale.items
    .map((item) => `${item.productName} (${formatKg(item.quantitySold)})`)
    .join(", ");

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-3">
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
      <p className="truncate text-sm text-muted-foreground">{itemsSummary}</p>
    </div>
  );
}
