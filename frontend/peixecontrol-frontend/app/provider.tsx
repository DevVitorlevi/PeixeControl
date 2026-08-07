"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          theme="light"
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "!bg-surface !text-foreground !border !border-border !shadow-elevation-md",
              title: "!text-foreground !font-medium",
              description: "!text-muted-foreground",
              actionButton: "!bg-primary !text-primary-foreground",
              cancelButton: "!bg-muted !text-foreground",
              closeButton: "!bg-surface !text-muted-foreground !border-border",
              success: "!border-success/30 [&_svg]:!text-success",
              error: "!border-destructive/30 [&_svg]:!text-destructive",
              warning: "!border-warning/30 [&_svg]:!text-warning",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
