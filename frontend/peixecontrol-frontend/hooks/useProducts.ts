"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });
}
