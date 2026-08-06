"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearchInput({
  value,
  onChange,
}: ProductSearchInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="product-search" className="sr-only">
        Buscar produto por nome
      </Label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="product-search"
          type="search"
          placeholder="Buscar produto por nome..."
          className="h-11 pl-9"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
