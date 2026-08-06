"use client";

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductFormValues } from "@/lib/validations/edit-product";

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export function ProductFormFields({
  register,
  errors,
}: ProductFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome do produto</Label>
        <Input
          id="name"
          type="text"
          autoComplete="off"
          placeholder="Ex: Tilápia"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="h-11"
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="quantity">Quantidade (kg)</Label>
          <Input
            id="quantity"
            type="number"
            step="0.1"
            min="0"
            inputMode="decimal"
            placeholder="0"
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
            className="h-11"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p
              id="quantity-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="pricePerKg">Preço/kg (R$)</Label>
          <Input
            id="pricePerKg"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            placeholder="0,00"
            aria-invalid={Boolean(errors.pricePerKg)}
            aria-describedby={
              errors.pricePerKg ? "pricePerKg-error" : undefined
            }
            className="h-11"
            {...register("pricePerKg", { valueAsNumber: true })}
          />
          {errors.pricePerKg && (
            <p
              id="pricePerKg-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.pricePerKg.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
