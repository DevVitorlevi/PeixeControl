"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useLowStockProducts } from "@/hooks/useLowStockProducts";
import { ProductSearchInput } from "@/components/ProductSearchInput/ProductSearchInput";
import { ProductPickerCard } from "@/components/ProductPickerCard/ProductPickerCard";
import {
  ProductListEmpty,
  ProductListError,
  ProductListLoading,
} from "@/components/ProductListStates/ProductListStates";
import type { Product } from "@/types/stock";

interface ProductPickerProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductPicker({ onAddToCart }: ProductPickerProps) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const productsQuery = useProducts();
  const lowStockQuery = useLowStockProducts();

  const lowStockIds = useMemo(
    () => new Set((lowStockQuery.data ?? []).map((product) => product._id)),
    [lowStockQuery.data],
  );

  const filteredProducts = useMemo(() => {
    const products = productsQuery.data ?? [];
    const query = deferredSearch.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  }, [productsQuery.data, deferredSearch]);

  return (
    <div className="flex flex-col gap-4">
      <ProductSearchInput value={search} onChange={setSearch} />

      {productsQuery.isLoading && <ProductListLoading />}

      {productsQuery.isError && (
        <ProductListError onRetry={() => productsQuery.refetch()} />
      )}

      {productsQuery.isSuccess && filteredProducts.length === 0 && (
        <ProductListEmpty
          hasActiveSearch={deferredSearch.trim().length > 0}
          searchTerm={deferredSearch}
        />
      )}

      {productsQuery.isSuccess && filteredProducts.length > 0 && (
        <div className="flex flex-col gap-3">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className="motion-safe:animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
            >
              <ProductPickerCard
                product={product}
                isLowStock={lowStockIds.has(product._id)}
                onAdd={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
