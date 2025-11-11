"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const router = useRouter();
  const { isAuthenticated, user, token, logout } = useAuthStore();

  useEffect(() => {
    // Redireciona para login se não estiver autenticado
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return {
    isAuthenticated,
    user,
    token,
    logout,
  };
}
