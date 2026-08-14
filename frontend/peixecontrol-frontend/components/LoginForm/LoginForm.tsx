"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Fish } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/hooks/useLogin";

const loginSchema = z.object({
  email: z.string().min(1, "Informe o e-mail").email("E-mail inválido"),
  password: z.string().min(1, "Informe a senha"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  defaultEmail?: string;
}

export function LoginForm({ defaultEmail }: LoginFormProps) {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: defaultEmail ?? "", password: "" },
  });

  function onSubmit(data: LoginFormData) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Login realizado com sucesso");
        router.replace("/");
      },
      onError: (error) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "E-mail ou senha inválidos";
        toast.error(message);
      },
    });
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Card
        className="w-full max-w-sm sm:max-w-md overflow-hidden border-border shadow-lg shadow-primary/5
          motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
      >
        <CardHeader className="items-center gap-2 px-4 pt-6 text-center sm:px-6">
          <CardTitle className="font-heading text-lg sm:text-xl">
            Entrar no PeixeControl
          </CardTitle>
          <CardDescription className="text-sm">
            Acesse com seu e-mail e senha cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-6 sm:px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-3 sm:gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="h-11 text-base transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40"
                {...register("email")}
              />
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-sm text-destructive motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="h-11 text-base transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40"
                {...register("password")}
              />
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-sm text-destructive motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="h-11 mt-2 bg-primary text-primary-foreground shadow-sm
                transition-all duration-200 hover:bg-primary/90 hover:shadow-md
                motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 transition-colors duration-200 hover:underline hover:text-primary/80"
              >
                Criar conta
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
