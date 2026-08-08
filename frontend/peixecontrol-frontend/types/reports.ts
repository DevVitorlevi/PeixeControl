import type { Sale } from "@/types/sales";

export interface SalesSummary {
  totalSalesValue: number;
  totalQuantity: number;
}

export interface TopProduct {
  _id: string;
  productName: string;
  totalQuantity: number;
  totalSalesValue: number;
}

export interface MonthlySummary {
  totalSalesValue: number;
  totalQuantity: number;
  sales: Sale[];
}
