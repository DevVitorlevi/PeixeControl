import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/product";

export function useLowStock() {
  return useQuery({
    queryKey: ["low-stock"],
    queryFn: () => productService.getLowStock(),
  });
}
