import { useQuery } from "@tanstack/react-query";

import { stockHistoryService } from "@/services/stockHistory";

interface UseStockHistoryParams {
  startDate: string;
  endDate: string;
}

export function useStockHistory({ startDate, endDate }: UseStockHistoryParams) {
  return useQuery({
    queryKey: ["stock-history", startDate, endDate],
    queryFn: () => stockHistoryService.getStockHistory({ startDate, endDate }),
  });
}
