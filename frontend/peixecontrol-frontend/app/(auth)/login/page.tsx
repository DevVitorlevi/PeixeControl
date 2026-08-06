"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  const { isAuthenticated, isHydrating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrating && isAuthenticated) {
      router.replace("/");
    }
  }, [isHydrating, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
