"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  const { isAuthenticated, isHydrating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrating && isAuthenticated) {
      router.replace("/");
    }
  }, [isHydrating, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-linear-to-b from-background via-background to-primary">
      <RegisterForm />
    </main>
  );
}
