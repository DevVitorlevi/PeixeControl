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
    <div className="hidden overflow-hidden rounded-lg border border-border bg-surface md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço/kg</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const isLowStock = lowStockIds.has(product._id);
            return (
              <TableRow key={product._id}>
                <TableCell className="font-medium text-foreground">
                  {product.name}
                </TableCell>
                <TableCell
                  className={
                    isLowStock
                      ? "font-semibold text-destructive"
                      : "font-semibold"
                  }
                >
                  {formatKg(product.quantity)}
                </TableCell>
                <TableCell>{formatCurrency(product.pricePerKg)}</TableCell>
                <TableCell>
                  {isLowStock ? (
                    <LowStockBadge />
                  ) : (
                    <span className="text-sm text-muted-foreground">
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
