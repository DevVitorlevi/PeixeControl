"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import type { RegisterInput } from "@/types/auth";

type PublicRegisterInput = Omit<RegisterInput, "role">;

export function useRegister() {
  return useMutation({
    mutationFn: (input: PublicRegisterInput) =>
      authService.register({ ...input, role: "user" }),
  });
}
