import { ProductList } from "@/components/ProductList/ProductList";

export default function EstoquePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Estoque</h1>
        <p className="text-muted-foreground">
          Acompanhe a quantidade e o preço dos produtos cadastrados.
        </p>
      </div>
      <ProductList />
    </main>
  );
}
