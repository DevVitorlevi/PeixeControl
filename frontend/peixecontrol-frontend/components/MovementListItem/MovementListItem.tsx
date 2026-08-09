import { MovementTypeBadge } from "@/components/MovementTypeBadge/MovementTypeBadge";
import { formatDate, formatKg, formatTime } from "@/lib/formatters";
import type { StockMovement } from "@/types/stock";

interface MovementListItemProps {
  movement: StockMovement;
  index?: number;
}

export function MovementListItem({
  movement,
  index = 0,
}: MovementListItemProps) {
  return (
    <li
      className="motion-safe:animate-fade-up flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 shadow-elevation transition-shadow hover:shadow-elevation-md"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-foreground">
          {movement.productName}
        </span>
        <MovementTypeBadge type={movement.type} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {formatDate(movement.date)} às {formatTime(movement.date)}
        </span>
        <span className="tabular-nums text-base font-semibold text-foreground">
          {formatKg(movement.quantity)}
        </span>
      </div>
    </li>
  );
}
