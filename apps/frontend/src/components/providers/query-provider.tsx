"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Cria um novo QueryClient por usuário (evita compartilhamento entre requests)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Dados ficam "frescos" por 30 segundos
            staleTime: 30 * 1000,
            // Cache mantém dados por 5 minutos
            gcTime: 5 * 60 * 1000,
            // Não refetch ao focar janela (pode ser irritante)
            refetchOnWindowFocus: false,
            // Retry 1 vez em caso de erro
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools (só aparece em desenvolvimento) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
