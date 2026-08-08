"use client";

import { useState } from "react";
import { toast } from "sonner";
import { playSound } from "@/lib/sounds";
import { useCreateSale } from "@/hooks/useCreateSale";
import type { CartLine } from "@/hooks/useCart";

export const PAYMENT_METHODS = [
  "Pix",
  "Dinheiro",
  "Cartão de Crédito",
  "Cartão de Débito",
] as const;

interface UseSaleCheckoutParams {
  lines: CartLine[];
  onCleared: () => void;
}

export function useSaleCheckout({ lines, onCleared }: UseSaleCheckoutParams) {
  const [paymentMethod, setPaymentMethod] = useState<string>("Pix");
  const createSale = useCreateSale();

  const hasInvalidLine = lines.some((line) => line.quantitySold <= 0);
  const canConfirm =
    lines.length > 0 && !hasInvalidLine && Boolean(paymentMethod);

  function handlePaymentMethodChange(value: string | null) {
    if (value) setPaymentMethod(value);
  }

  function handleConfirm() {
    if (!canConfirm) return;

    createSale.mutate(
      {
        items: lines.map((line) => ({
          productId: line.productId,
          quantitySold: line.quantitySold,
        })),
        paymentMethod,
      },
      {
        onSuccess: () => {
          playSound("saleCompleted");
          toast.success("Venda registrada com sucesso");
          onCleared();
        },
        onError: (error) => {
          const message =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Não foi possível registrar a venda";
          toast.error(message);
        },
      },
    );
  }

  return {
    paymentMethod,
    handlePaymentMethodChange,
    canConfirm,
    isPending: createSale.isPending,
    handleConfirm,
  };
}
