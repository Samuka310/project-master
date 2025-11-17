"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/services/auth.service";

// ✅ Função auxiliar para detectar erros do Axios
function isAxiosError(
  error: unknown,
): error is AxiosError<{ message?: string }> {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Configurar React Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Handler de submit
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Chamar API de login
      const response = await authService.login(data);

      // ✅ SALVAR NO ZUSTAND (persiste no localStorage automaticamente)
      login(response.user, response.token);

      // ✅ TAMBÉM SALVAR NO LOCALSTORAGE DIRETAMENTE (REDUNDÂNCIA BOA!)
      localStorage.setItem("token", response.token);

      // ✅ SALVAR USER NO LOCALSTORAGE TAMBÉM (OPCIONAL MAS ÚTIL)
      localStorage.setItem("user", JSON.stringify(response.user));

      console.log("✅ Login bem-sucedido:", {
        token: response.token,
        user: response.user,
        isAuthenticated: true,
      });

      // Redirecionar para dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else if (isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "Erro ao fazer login. Tente novamente.",
        );
      } else {
        setErrorMessage("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Entrar
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu email e senha para acessar
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Mensagem de erro global */}
              {errorMessage && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {errorMessage}
                </div>
              )}

              {/* Campo de Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Campo de Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Link "Esqueceu a senha?" */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              {/* Botão de Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>

              {/* Link para cadastro */}
              <p className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
