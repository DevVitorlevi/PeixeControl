import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function LowStockBadge() {
  return (
    <Badge
      variant="outline"
      className="gap-1.5 border-destructive/25 bg-destructive/10 text-destructive"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-destructive opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
      </span>
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
      Estoque baixo
    </Badge>
  );
}
