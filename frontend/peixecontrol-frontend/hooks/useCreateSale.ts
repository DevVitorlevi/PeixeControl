"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesService } from "@/services/sales";

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: salesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
}
