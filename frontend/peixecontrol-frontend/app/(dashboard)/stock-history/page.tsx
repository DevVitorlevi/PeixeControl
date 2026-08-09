import { MovementList } from "@/components/MovementList/MovementList";

export default function StockHistoryPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
      <div className="motion-safe:animate-fade-up">
        <h1 className="text-2xl font-semibold text-foreground text-balance">
          Movimentações
        </h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe entradas e saídas de estoque, com o total movimentado no
          período.
        </p>
        <div
          aria-hidden="true"
          className="mt-3 h-0.75 w-16 rounded-full bg-size-[200%_100%] bg-linear-to-r from-primary via-brand-secondary to-primary motion-safe:animate-shimmer"
        />
      </div>

      <MovementList />
    </main>
  );
}
