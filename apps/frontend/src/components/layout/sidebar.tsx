"use client";

import Link from "next/link";
import { X, Home, CheckSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay de fundo (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r bg-background transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header da Sidebar */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="font-bold text-xl">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar menu</span>
          </Button>
        </div>

        {/* Navegação */}
        <nav className="space-y-2 p-4">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            onClick={onClose}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/tasks"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            onClick={onClose}
          >
            <CheckSquare className="h-4 w-4" />
            <span>Tarefas</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            onClick={onClose}
          >
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
