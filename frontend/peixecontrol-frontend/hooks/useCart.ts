"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/stock";

export interface CartLine {
  productId: string;
  productName: string;
  pricePerKg: number;
  availableQuantity: number;
  quantitySold: number;
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  function addProduct(product: Product, quantity: number) {
    if (quantity <= 0) return;

    setLines((prev) => {
      const existing = prev.find((line) => line.productId === product._id);
      const maxQty = product.quantity;

      if (existing) {
        const nextQty = Math.min(existing.quantitySold + quantity, maxQty);
        return prev.map((line) =>
          line.productId === product._id
            ? { ...line, quantitySold: nextQty }
            : line,
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          productName: product.name,
          pricePerKg: product.pricePerKg,
          availableQuantity: maxQty,
          quantitySold: Math.min(quantity, maxQty),
        },
      ];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setLines((prev) =>
      prev.map((line) =>
        line.productId === productId
          ? {
              ...line,
              quantitySold: Math.max(
                0,
                Math.min(quantity, line.availableQuantity),
              ),
            }
          : line,
      ),
    );
  }

  function removeLine(productId: string) {
    setLines((prev) => prev.filter((line) => line.productId !== productId));
  }

  function clear() {
    setLines([]);
  }

  const itemCount = lines.length;
  const total = useMemo(
    () =>
      lines.reduce((sum, line) => sum + line.quantitySold * line.pricePerKg, 0),
    [lines],
  );

  return {
    lines,
    addProduct,
    updateQuantity,
    removeLine,
    clear,
    itemCount,
    total,
  };
}
