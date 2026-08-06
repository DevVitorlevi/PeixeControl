"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { ProductFormFields } from "../ProductFormFields/ProductFormFields";

const productSchema = z.object({
  name: z.string().min(1, "Informe o nome do produto"),
  quantity: z
    .number({ error: "Informe a quantidade" })
    .min(0, "Quantidade não pode ser negativa"),
  pricePerKg: z
    .number({ error: "Informe o preço por kg" })
    .positive("Preço deve ser maior que zero"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const createProduct = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", quantity: 0, pricePerKg: 0 },
  });

  function onSubmit(data: ProductFormValues) {
    createProduct.mutate(data, {
      onSuccess: () => {
        toast.success("Produto cadastrado com sucesso");
        reset();
        setOpen(false);
      },
      onError: (error) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "Não foi possível cadastrar o produto";
        toast.error(message);
      },
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) reset();
  }

  return (
    <>
      <Button
        type="button"
        className="h-11 gap-2"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Novo produto
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo produto</DialogTitle>
            <DialogDescription>
              Cadastre um novo peixe no estoque.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <ProductFormFields register={register} errors={errors} />

            <DialogFooter>
              <Button
                type="submit"
                disabled={createProduct.isPending}
                className="h-11 w-full gap-2 sm:w-auto"
              >
                {createProduct.isPending ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Salvando...
                  </>
                ) : (
                  "Salvar produto"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
