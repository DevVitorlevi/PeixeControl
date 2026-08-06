import type { Metadata } from "next";
import { Manrope, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/provider";

// Corpo / UI geral: labels, texto de formulário, texto de tabela
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

// Títulos e headings: CardTitle, h1-h6
const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Números: preço (R$), peso (kg), totais de relatório — alinhamento tabular
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
