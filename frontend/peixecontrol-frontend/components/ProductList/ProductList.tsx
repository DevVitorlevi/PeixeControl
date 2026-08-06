"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useLowStockProducts } from "@/hooks/useLowStockProducts";
import { useLowStockSoundAlert } from "@/hooks/useLowStockSoundAlert";
import { ProductSearchInput } from "../ProductSearchInput/ProductSearchInput";
import { ProductTable } from "../ProductTable/ProductTable";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import {
  ProductListEmpty,
  ProductListError,
  ProductListLoading,
} from "../ProductListStates/ProductListStates";

export function ProductList() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const productsQuery = useProducts();
  const lowStockQuery = useLowStockProducts();

  const lowStockIds = useMemo(
    () => new Set((lowStockQuery.data ?? []).map((product) => product._id)),
    [lowStockQuery.data],
  );

  useLowStockSoundAlert(lowStockIds.size > 0);

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
        <>
          <ProductTable products={filteredProducts} lowStockIds={lowStockIds} />
          <ul className="flex flex-col gap-3 md:hidden">
            {filteredProducts.map((product) => (
              <ProductListItem
                key={product._id}
                product={product}
                isLowStock={lowStockIds.has(product._id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
