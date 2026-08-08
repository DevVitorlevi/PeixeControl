import { useQuery } from "@tanstack/react-query";

import { reportsService } from "@/services/reports";

export function useMonthlySummary(month: number, year: number) {
  return useQuery({
    queryKey: ["monthly-summary", month, year],
    queryFn: () => reportsService.getMonthlySummary(month, year),
  });
}
