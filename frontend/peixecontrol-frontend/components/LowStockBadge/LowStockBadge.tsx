import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function LowStockBadge() {
  return (
    <Badge
      variant="outline"
      className="gap-1 border-destructive/30 bg-destructive/10 text-destructive"
    >
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
      Estoque baixo
    </Badge>
  );
}
