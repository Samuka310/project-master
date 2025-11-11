"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Botão Menu Mobile */}
        {isAuthenticated && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        )}

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">Project Master</span>
        </Link>

        {/* Navegação Desktop (só se autenticado) */}
        {isAuthenticated && (
          <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Tarefas
            </Link>
            <Link
              href="/profile"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Perfil
            </Link>
          </nav>
        )}

        {/* Ações à direita */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:block">
                {user?.name}
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Cadastrar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
