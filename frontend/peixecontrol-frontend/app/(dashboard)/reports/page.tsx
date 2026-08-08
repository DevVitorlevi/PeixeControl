import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesSummaryCards } from "@/components/SalesSummaryCards/SalesSummaryCards";

export default function ReportsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
      <div className="motion-safe:animate-fade-up">
        <h1 className="text-2xl font-semibold text-foreground text-balance">
          Relatórios
        </h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe vendas, produtos mais vendidos, lucro e o resumo mensal.
        </p>
        <div
          aria-hidden="true"
          className="mt-3 h-0.75 w-16 rounded-full bg-size-[200%_100%] bg-linear-to-r from-primary via-brand-secondary to-primary motion-safe:animate-shimmer"
        />
      </div>

      <Tabs defaultValue="sales-summary" className="flex flex-col gap-4">
        <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          <TabsTrigger value="sales-summary" className="h-11 shrink-0 px-4">
            Resumo de vendas
          </TabsTrigger>
          <TabsTrigger value="top-products" className="h-11 shrink-0 px-4">
            Top produtos
          </TabsTrigger>
          <TabsTrigger value="profit" className="h-11 shrink-0 px-4">
            Lucro
          </TabsTrigger>
          <TabsTrigger value="monthly" className="h-11 shrink-0 px-4">
            Mensal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales-summary">
          <SalesSummaryCards />
        </TabsContent>

        <TabsContent
          value="top-products"
          className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-muted-foreground"
        >
          Top produtos e alerta de estoque baixo — chega em breve.
        </TabsContent>

        <TabsContent
          value="profit"
          className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-muted-foreground"
        >
          Lucro total — chega em breve.
        </TabsContent>

        <TabsContent
          value="monthly"
          className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-muted-foreground"
        >
          Resumo mensal — chega em breve.
        </TabsContent>
      </Tabs>
    </main>
  );
}
