import { api } from "@/lib/api";
import type { Sale } from "@/types/sales";
import type { MonthlySummary, SalesSummary, TopProduct } from "@/types/reports";

export const reportsService = {
  async getSalesHistory(date: string): Promise<Sale[]> {
    const { data } = await api.get<Sale[]>("/reports/sales-history", {
      params: { date },
    });
    return data;
  },

  async getSalesSummary(
    startDate: string,
    endDate: string,
  ): Promise<SalesSummary> {
    const { data } = await api.get<SalesSummary>("/reports/sales-summary", {
      params: { startDate, endDate },
    });
    return data;
  },

  async getTopProducts(date?: string): Promise<TopProduct[]> {
    const { data } = await api.get<TopProduct[]>("/reports/top-products", {
      params: date ? { date } : undefined,
    });
    return data;
  },

  async getMonthlySummary(
    month: number,
    year: number,
  ): Promise<MonthlySummary> {
    const { data } = await api.get<MonthlySummary>("/reports/monthly-summary", {
      params: { month, year },
    });
    return data;
  },
};
