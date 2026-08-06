"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { playSound } from "@/lib/sounds";

const REPEAT_INTERVAL_MS = 10 * 60 * 1000;

export function useLowStockSoundAlert(hasLowStock: boolean) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function trigger() {
      playSound("lowStockAlert");
      toast.warning("Estoque baixo em um ou mais produtos", {
        duration: 6000,
      });
    }

    if (hasLowStock) {
      trigger();
      intervalRef.current = setInterval(trigger, REPEAT_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasLowStock]);
}
