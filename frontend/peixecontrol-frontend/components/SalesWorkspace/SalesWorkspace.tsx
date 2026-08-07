"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
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
import { useCart } from "@/hooks/useCart";

export function SalesWorkspace() {
  const cart = useCart();
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  function handleCleared() {
    cart.clear();
    setMobileCartOpen(false);
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        <ProductPicker onAddToCart={cart.addProduct} />
      </div>

      {/* Desktop: carrinho fixo lateral (SDD §5) */}
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

      {/* Mobile: botão flutuante + drawer inferior (SDD §5) */}
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
          className="max-h-[85vh] overflow-y-auto rounded-t-2xl md:hidden"
        >
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
            <SheetDescription>
              Revise os itens antes de confirmar a venda.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <CartPanel
              lines={cart.lines}
              total={cart.total}
              onUpdateQuantity={cart.updateQuantity}
              onRemove={cart.removeLine}
              onCleared={handleCleared}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
