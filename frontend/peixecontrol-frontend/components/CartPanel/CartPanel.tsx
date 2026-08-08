"use client";

import { ShoppingBag } from "lucide-react";
import { CartItemRow } from "@/components/CartItemRow/CartItemRow";
import { CartCheckoutFooter } from "@/components/CartCheckoutFooter/CartCheckoutFooter";
import { useSaleCheckout } from "@/hooks/useSaleCheckout";
import type { CartLine } from "@/hooks/useCart";

interface CartPanelProps {
  lines: CartLine[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCleared: () => void;
}

export function CartPanel({
  lines,
  total,
  onUpdateQuantity,
  onRemove,
  onCleared,
}: CartPanelProps) {
  const checkout = useSaleCheckout({ lines, onCleared });

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
          <ShoppingBag className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <p className="text-muted-foreground">
          Adicione produtos para iniciar uma venda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {lines.map((line) => (
          <CartItemRow
            key={line.productId}
            line={line}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="border-t border-border pt-3">
        <CartCheckoutFooter
          paymentMethod={checkout.paymentMethod}
          onPaymentMethodChange={checkout.handlePaymentMethodChange}
          total={total}
          canConfirm={checkout.canConfirm}
          isPending={checkout.isPending}
          onConfirm={checkout.handleConfirm}
        />
      </div>
    </div>
  );
}
