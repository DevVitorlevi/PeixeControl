import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { StockMovement } from "@/types/stock";

interface MovementTypeBadgeProps {
  type: StockMovement["type"];
}

export function MovementTypeBadge({ type }: MovementTypeBadgeProps) {
  const isEntrada = type === "Entrada";

  return (
    <Badge
      variant="outline"
      className={
        isEntrada
          ? "gap-1.5 border-success/25 bg-success/10 text-success"
          : "gap-1.5 border-warning/25 bg-warning/10 text-warning"
      }
    >
      {isEntrada ? (
        <ArrowDownCircle className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <ArrowUpCircle className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {type}
    </Badge>
  );
}
