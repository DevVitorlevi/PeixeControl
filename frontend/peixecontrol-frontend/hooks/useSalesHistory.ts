import { useQuery } from "@tanstack/react-query";

import { reportsService } from "@/services/reports";

interface UseSalesHistoryOptions {
  enabled?: boolean;
}

export function useSalesHistory(
  date: string,
  options?: UseSalesHistoryOptions,
) {
  return useQuery({
    queryKey: ["sales-history", date],
    queryFn: () => reportsService.getSalesHistory(date),
    enabled: options?.enabled ?? true,
  });
}
