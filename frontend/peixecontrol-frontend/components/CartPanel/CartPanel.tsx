"use client";

import { useState } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartItemRow } from "@/components/CartItemRow/CartItemRow";
import { formatCurrency } from "@/lib/formatters";
import { playSound } from "@/lib/sounds";
import { useCreateSale } from "@/hooks/useCreateSale";
import type { CartLine } from "@/hooks/useCart";

const PAYMENT_METHODS = ["Dinheiro", "Cartão", "Pix"] as const;

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
  const [paymentMethod, setPaymentMethod] = useState<string>("Pix");
  const createSale = useCreateSale();

  const hasInvalidLine = lines.some((line) => line.quantitySold <= 0);
  const canConfirm =
    lines.length > 0 && !hasInvalidLine && Boolean(paymentMethod);

  function handlePaymentMethodChange(value: string | null) {
    // forma de pagamento é obrigatória — ignora tentativa de limpar a seleção
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

      <div className="flex flex-col gap-2">
        <label
          htmlFor="payment-method"
          className="text-sm font-medium text-foreground"
        >
          Forma de pagamento
        </label>
        <Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
          <SelectTrigger id="payment-method" className="h-11">
            <SelectValue placeholder="Selecione…" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_METHODS.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="font-medium text-foreground">Total</span>
        <span className="text-xl font-semibold tabular-nums text-primary">
          {formatCurrency(total)}
        </span>
      </div>

      <Button
        type="button"
        className="h-11 w-full gap-2"
        disabled={!canConfirm || createSale.isPending}
        onClick={handleConfirm}
      >
        {createSale.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Registrando…
          </>
        ) : (
          "Confirmar venda"
        )}
      </Button>
    </div>
  );
}
