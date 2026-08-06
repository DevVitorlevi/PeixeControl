"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/service/auth";
import { useAuth } from "@/hooks/useAuth";
import type { LoginInput } from "@/types/auth";

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: (data) => {
      signIn(data.user, data.token);
    },
  });
}
