"use client";

import { useState } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductPicker } from "@/components/ProductPicker/ProductPicker";
import { CartPanel } from "@/components/CartPanel/CartPanel";
import { CartItemRow } from "@/components/CartItemRow/CartItemRow";
import { CartCheckoutFooter } from "@/components/CartCheckoutFooter/CartCheckoutFooter";
import { useCart } from "@/hooks/useCart";
import { useSaleCheckout } from "@/hooks/useSaleCheckout";

export function SalesWorkspace() {
  const cart = useCart();
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  function handleCleared() {
    cart.clear();
    setMobileCartOpen(false);
  }

  const checkout = useSaleCheckout({
    lines: cart.lines,
    onCleared: handleCleared,
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        <ProductPicker onAddToCart={cart.addProduct} />
      </div>

      <aside className="hidden md:block">
        <div className="sticky top-6 rounded-lg border border-border bg-surface p-4 shadow-elevation">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Carrinho
          </h2>
          <CartPanel
            lines={cart.lines}
            total={cart.total}
            onUpdateQuantity={cart.updateQuantity}
            onRemove={cart.removeLine}
            onCleared={handleCleared}
          />
        </div>
      </aside>

      {cart.itemCount > 0 && (
        <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
          <Button
            type="button"
            className="h-14 w-full gap-2 shadow-elevation-md"
            onClick={() => setMobileCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            Ver carrinho · {cart.itemCount}{" "}
            {cart.itemCount === 1 ? "item" : "itens"}
          </Button>
        </div>
      )}

      <Sheet open={mobileCartOpen} onOpenChange={setMobileCartOpen}>
        <SheetContent
          side="bottom"
          initialFocus={false}
          className="flex max-h-[88vh] flex-col gap-0 rounded-t-2xl p-0 md:hidden"
        >
          <SheetHeader className="border-b border-border px-4 py-4 text-left">
            <SheetTitle>Carrinho</SheetTitle>
            <SheetDescription>
              Revise os itens antes de confirmar a venda.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {cart.lines.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                  <ShoppingBag
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-muted-foreground">
                  Adicione produtos para iniciar uma venda.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {cart.lines.map((line) => (
                  <CartItemRow
                    key={line.productId}
                    line={line}
                    onUpdateQuantity={cart.updateQuantity}
                    onRemove={cart.removeLine}
                  />
                ))}
              </div>
            )}
          </div>

          {cart.lines.length > 0 && (
            <div className="border-t border-border bg-surface px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-elevation-md">
              <CartCheckoutFooter
                paymentMethod={checkout.paymentMethod}
                onPaymentMethodChange={checkout.handlePaymentMethodChange}
                total={cart.total}
                canConfirm={checkout.canConfirm}
                isPending={checkout.isPending}
                onConfirm={checkout.handleConfirm}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
