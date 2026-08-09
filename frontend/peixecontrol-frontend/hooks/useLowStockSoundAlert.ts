"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { playSound } from "@/lib/sounds";
import type { Product } from "@/types/stock";

const REPEAT_INTERVAL_MS = 10 * 60 * 1000;
const TOAST_ID = "low-stock-alert";

function buildMessage(products: Product[]): string {
  if (products.length === 1) {
    return `${products[0].name} está com estoque baixo`;
  }

  const [first, second] = products;

  if (products.length === 2) {
    return `${first.name} e ${second.name} estão com estoque baixo`;
  }

  const rest = products.length - 2;
  return `${first.name}, ${second.name} e mais ${rest} produto${
    rest > 1 ? "s" : ""
  } com estoque baixo`;
}

export function useLowStockSoundAlert(lowStockProducts: Product[]) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lowStockKey = lowStockProducts
    .map((product) => product._id)
    .sort()
    .join(",");

  useEffect(() => {
    function trigger() {
      playSound("lowStockAlert");
      toast.warning(buildMessage(lowStockProducts), {
        id: TOAST_ID,
        duration: 6000,
      });
    }

    if (lowStockKey) {
      trigger();
      intervalRef.current = setInterval(trigger, REPEAT_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [lowStockKey]);
}
