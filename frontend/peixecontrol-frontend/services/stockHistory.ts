import { api } from "@/lib/api";
import type { StockMovement } from "@/types/stock";

interface GetStockHistoryParams {
  date?: string;
  startDate?: string;
  endDate?: string;
}

export const stockHistoryService = {
  async getStockHistory(
    params?: GetStockHistoryParams,
  ): Promise<StockMovement[]> {
    const { data } = await api.get<StockMovement[]>("/stock-history", {
      params,
    });
    return data;
  },
};
