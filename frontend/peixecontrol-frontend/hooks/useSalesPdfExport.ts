"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { Sale } from "@/types/sales";

interface ExportSalesPdfParams {
  title: string;
  sales: Sale[];
  totalSalesValue: number;
  totalQuantity: number;
  fileName: string;
}

export function useSalesPdfExport() {
  const [isExporting, setIsExporting] = useState(false);

  async function exportPdf(params: ExportSalesPdfParams) {
    setIsExporting(true);
    try {
      const { generateSalesPdf } = await import("@/lib/pdf/generateSalesPdf");
      await generateSalesPdf(params);
    } catch {
      toast.error("Não foi possível gerar o PDF");
    } finally {
      setIsExporting(false);
    }
  }

  return { exportPdf, isExporting };
}
