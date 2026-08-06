"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
