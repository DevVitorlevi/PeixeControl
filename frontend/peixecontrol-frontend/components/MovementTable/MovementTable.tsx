import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MovementTypeBadge } from "@/components/MovementTypeBadge/MovementTypeBadge";
import { formatDate, formatKg, formatTime } from "@/lib/formatters";
import type { StockMovement } from "@/types/stock";

interface MovementTableProps {
  movements: StockMovement[];
}

export function MovementTable({ movements }: MovementTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-border bg-surface shadow-elevation md:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Data</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((movement, index) => (
            <TableRow
              key={movement._id}
              className="motion-safe:animate-fade-up border-border transition-colors hover:bg-accent/60"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
            >
              <TableCell className="text-foreground">
                {formatDate(movement.date)}{" "}
                <span className="text-muted-foreground">
                  {formatTime(movement.date)}
                </span>
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {movement.productName}
              </TableCell>
              <TableCell>
                <MovementTypeBadge type={movement.type} />
              </TableCell>
              <TableCell className="text-right tabular-nums font-semibold text-foreground">
                {formatKg(movement.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
