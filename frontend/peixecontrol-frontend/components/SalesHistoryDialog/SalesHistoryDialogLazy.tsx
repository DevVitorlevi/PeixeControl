"use client";

import dynamic from "next/dynamic";

const SalesHistoryDialog = dynamic(
  () =>
    import("@/components/SalesHistoryDialog/SalesHistoryDialog").then(
      (mod) => mod.SalesHistoryDialog,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-11 w-40 animate-pulse rounded-md bg-primary-light"
        aria-hidden="true"
      />
    ),
  },
);

export function SalesHistoryDialogLazy() {
  return <SalesHistoryDialog />;
}
