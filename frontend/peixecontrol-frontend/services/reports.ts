import { api } from "@/lib/api";
import type { Sale } from "@/types/sales";

export const reportsService = {
  async getSalesHistory(date: string): Promise<Sale[]> {
    const { data } = await api.get<Sale[]>("/reports/sales-history", {
      params: { date },
    });
    return data;
  },
};
