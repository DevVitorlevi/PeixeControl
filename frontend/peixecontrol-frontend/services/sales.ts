import { api } from "@/lib/api";
import type { Sale, SaleInput } from "@/types/sales";

export const salesService = {
  async create(input: SaleInput): Promise<Sale> {
    const { data } = await api.post<Sale>("/sales", input);
    return data;
  },

  async getAll(): Promise<Sale[]> {
    const { data } = await api.get<Sale[]>("/sales");
    return data;
  },
};
