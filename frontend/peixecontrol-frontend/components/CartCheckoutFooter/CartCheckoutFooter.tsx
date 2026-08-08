"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/formatters";
import { PAYMENT_METHODS } from "@/hooks/useSaleCheckout";

interface CartCheckoutFooterProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string | null) => void;
  total: number;
  canConfirm: boolean;
  isPending: boolean;
  onConfirm: () => void;
}

export function CartCheckoutFooter({
  paymentMethod,
  onPaymentMethodChange,
  total,
  canConfirm,
  isPending,
  onConfirm,
}: CartCheckoutFooterProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="payment-method"
          className="text-sm font-medium text-foreground"
        >
          Forma de pagamento
        </label>
        <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
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

      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground">Total</span>
        <span className="text-xl font-semibold tabular-nums text-primary">
          {formatCurrency(total)}
        </span>
      </div>

      <Button
        type="button"
        className="h-12 w-full gap-2"
        disabled={!canConfirm || isPending}
        onClick={onConfirm}
      >
        {isPending ? (
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
