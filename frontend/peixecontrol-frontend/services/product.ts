import { api } from "@/lib/api";
import type { Product, ProductInput } from "@/types/stock";

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products");
    return data;
  },

  async getLowStock(): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products/low-stock-alert");
    return data;
  },

  async create(input: ProductInput): Promise<Product> {
    const { data } = await api.post<Product>("/products", input);
    return data;
  },
};
