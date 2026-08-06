import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/provider";

export const metadata: Metadata = {
  title: "PeixeControl",
  description: "Gestão de estoque e vendas para peixarias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
