import { SalesWorkspace } from "@/components/SalesWorkspace/SalesWorkspace";

export default function SalesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 pb-24 md:p-8">
      <div className="motion-safe:animate-fade-up">
        <h1 className="text-2xl font-semibold text-foreground text-balance">
          Vendas
        </h1>
        <p className="mt-1 text-muted-foreground">
          Monte o carrinho e registre uma nova venda.
        </p>
        <div
          aria-hidden="true"
          className="mt-3 h-0.75 w-16 rounded-full bg-size-[200%_100%] bg-linear-to-r from-primary via-brand-secondary to-primary motion-safe:animate-shimmer"
        />
      </div>

      <SalesWorkspace />
    </main>
  );
}
