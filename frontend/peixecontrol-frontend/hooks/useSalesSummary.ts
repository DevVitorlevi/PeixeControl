import { useQuery } from "@tanstack/react-query";

import { reportsService } from "@/services/reports";

export function useSalesSummary(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["sales-summary", startDate, endDate],
    queryFn: () => reportsService.getSalesSummary(startDate, endDate),
  });
}
