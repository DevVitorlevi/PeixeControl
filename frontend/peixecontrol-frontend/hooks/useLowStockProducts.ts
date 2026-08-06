"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product";

export function useLowStockProducts() {
  return useQuery({
    queryKey: ["products", "low-stock"],
    queryFn: productService.getLowStock,
    refetchInterval: 5 * 60 * 1000,
  });
}
