export interface Product {
  _id: string;
  userId: string;
  name: string;
  pricePerKg: number;
  quantity: number;
  createdAt: string;
}

export interface ProductInput {
  name: string;
  pricePerKg: number;
  quantity: number;
}

export interface StockMovement {
  _id: string;
  userId: string;
  productId: string;
  productName: string;
  type: "Entrada" | "Saída";
  quantity: number;
  date: string;
}
