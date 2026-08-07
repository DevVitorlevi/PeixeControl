export interface SaleItem {
  productId: string;
  productName: string;
  quantitySold: number;
  pricePerKg: number;
}

export interface Sale {
  _id: string;
  userId: string;
  items: SaleItem[];
  total: number;
  paymentMethod: string;
  saleDate: string;
}

export interface SaleItemInput {
  productId: string;
  quantitySold: number;
}

export interface SaleInput {
  items: SaleItemInput[];
  paymentMethod: string;
}
