import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatKg } from "@/lib/formatters";
import { LowStockBadge } from "../LowStockBadge/LowStockBadge";
import type { Product } from "@/types/stock";

interface ProductTableProps {
  products: Product[];
  lowStockIds: Set<string>;
}

export function ProductTable({ products, lowStockIds }: ProductTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-border bg-surface shadow-elevation md:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço/kg</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => {
            const isLowStock = lowStockIds.has(product._id);
            return (
              <TableRow
                key={product._id}
                className="motion-safe:animate-fade-up border-border transition-colors hover:bg-accent/60"
                style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
              >
                <TableCell className="font-medium text-foreground">
                  {product.name}
                </TableCell>
                <TableCell
                  className={
                    isLowStock
                      ? "tabular-nums font-semibold text-destructive"
                      : "tabular-nums font-semibold text-foreground"
                  }
                >
                  {formatKg(product.quantity)}
                </TableCell>
                <TableCell className="tabular-nums text-foreground">
                  {formatCurrency(product.pricePerKg)}
                </TableCell>
                <TableCell>
                  {isLowStock ? (
                    <LowStockBadge />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full bg-success"
                        aria-hidden="true"
                      />
                      Normal
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
