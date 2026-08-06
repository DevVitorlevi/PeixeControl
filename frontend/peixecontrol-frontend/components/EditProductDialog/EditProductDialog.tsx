"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { ProductFormFields } from "../ProductFormFields/ProductFormFields";
import {
  productSchema,
  type ProductFormValues,
} from "@/lib/validations/edit-product";
import type { Product } from "@/types/stock";

interface EditProductDialogProps {
  product: Product;
}

export function EditProductDialog({ product }: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      quantity: product.quantity,
      pricePerKg: product.pricePerKg,
    },
  });

  function onSubmit(data: ProductFormValues) {
    updateProduct.mutate(
      { id: product._id, input: data },
      {
        onSuccess: () => {
          toast.success("Produto atualizado com sucesso");
          setOpen(false);
        },
        onError: (error) => {
          const message =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Não foi possível atualizar o produto";
          toast.error(message);
        },
      },
    );
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      // garante que o form reflita o produto atual (dados podem ter mudado desde o último open)
      reset({
        name: product.name,
        quantity: product.quantity,
        pricePerKg: product.pricePerKg,
      });
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-11 w-11 text-muted-foreground hover:text-primary"
        aria-label={`Editar ${product.name}`}
        onClick={() => handleOpenChange(true)}
      >
        <Pencil className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar produto</DialogTitle>
            <DialogDescription>
              Atualize as informações de {product.name}.
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
                disabled={updateProduct.isPending}
                className="h-11 w-full gap-2 sm:w-auto"
              >
                {updateProduct.isPending ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Salvando…
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
