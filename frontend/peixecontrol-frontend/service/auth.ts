import { api } from "@/lib/api";
import type { LoginInput, LoginResponse } from "../types/auth";

export const authService = {
  async login(input: LoginInput): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", input);
    return data;
  },
};
