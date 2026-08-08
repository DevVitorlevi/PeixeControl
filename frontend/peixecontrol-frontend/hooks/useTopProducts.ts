import { useQuery } from "@tanstack/react-query";

import { reportsService } from "@/services/reports";

export function useTopProducts(date?: string) {
  return useQuery({
    queryKey: ["top-products", date ?? "all"],
    queryFn: () => reportsService.getTopProducts(date),
  });
}
