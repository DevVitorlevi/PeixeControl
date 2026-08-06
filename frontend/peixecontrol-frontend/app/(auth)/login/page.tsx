"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  const { isAuthenticated, isHydrating } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get("email") ?? undefined;

  useEffect(() => {
    if (!isHydrating && isAuthenticated) {
      router.replace("/");
    }
  }, [isHydrating, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-linear-to-b from-background via-background to-primary">
      <LoginForm defaultEmail={prefilledEmail} />
    </main>
  );
}
