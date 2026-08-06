import { ProductList } from "@/components/ProductList/ProductList";
import { CreateProductDialog } from "@/components/CreateProductDialog/CreateProductDialog";

export default function EstoquePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="motion-safe:animate-fade-up">
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            Estoque
          </h1>
          <p className="mt-1 text-muted-foreground">
            Acompanhe a quantidade e o preço dos produtos cadastrados.
          </p>
          <div
            aria-hidden="true"
            className="mt-3 h-0.75 w-16 rounded-full bg-size-[200%_100%] bg-linear-to-r from-primary via-brand-secondary to-primary motion-safe:animate-shimmer"
          />
        </div>

        <CreateProductDialog />
      </div>

      <ProductList />
    </main>
  );
}
