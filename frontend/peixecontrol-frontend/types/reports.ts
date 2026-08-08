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
