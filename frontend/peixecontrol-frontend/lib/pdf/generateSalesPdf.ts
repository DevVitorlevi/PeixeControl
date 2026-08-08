import type { Sale } from "@/types/sales";
import {
  formatCurrency,
  formatDate,
  formatKg,
  formatTime,
} from "@/lib/formatters";

interface GenerateSalesPdfOptions {
  title: string;
  sales: Sale[];
  totalSalesValue: number;
  totalQuantity: number;
  fileName: string;
}

export async function generateSalesPdf({
  title,
  sales,
  totalSalesValue,
  totalQuantity,
  fileName,
}: GenerateSalesPdfOptions): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(title, 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Total vendido: ${formatCurrency(totalSalesValue)}`, 14, 26);
  doc.text(`Total em kg: ${formatKg(totalQuantity)}`, 14, 32);

  const rows = sales.map((sale) => [
    formatDate(sale.saleDate),
    formatTime(sale.saleDate),
    sale.items
      .map((item) => `${item.productName} (${formatKg(item.quantitySold)})`)
      .join(", "),
    sale.paymentMethod,
    formatCurrency(sale.total),
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["Data", "Hora", "Itens", "Pagamento", "Total"]],
    body: rows,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [3, 105, 161] },
    columnStyles: { 4: { halign: "right" } },
  });

  doc.save(fileName);
}
