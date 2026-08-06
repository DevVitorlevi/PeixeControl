import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Informe o nome do produto"),
  quantity: z
    .number({ error: "Informe a quantidade" })
    .min(0, "Quantidade não pode ser negativa"),
  pricePerKg: z
    .number({ error: "Informe o preço por kg" })
    .positive("Preço deve ser maior que zero"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
