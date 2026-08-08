import { useQuery } from "@tanstack/react-query";

import { reportsService } from "@/services/reports";

export function useSalesHistory(date: string) {
  return useQuery({
    queryKey: ["sales-history", date],
    queryFn: () => reportsService.getSalesHistory(date),
  });
}
