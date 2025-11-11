"use client";

import { motion } from "framer-motion";
import { CheckSquare, Clock, TrendingUp, Users } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

// Animação de fade-up para os cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function DashboardPage() {
  const { user } = useAuth();

  // Dados mockados (depois vamos buscar da API)
  const stats = [
    {
      title: "Total de Tarefas",
      value: "12",
      description: "3 novas hoje",
      icon: CheckSquare,
      color: "text-blue-600",
    },
    {
      title: "Em Andamento",
      value: "5",
      description: "41% do total",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Concluídas",
      value: "7",
      description: "58% do total",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Colaboradores",
      value: "8",
      description: "2 online agora",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bem-vindo, {user?.name || "Usuário"}! 👋
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Aqui está um resumo das suas atividades
          </motion.p>
        </div>

        {/* Grid de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Seção de Atividades Recentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Suas últimas ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Criou tarefa",
                    name: "Implementar autenticação",
                    time: "2 horas atrás",
                  },
                  {
                    action: "Completou tarefa",
                    name: "Configurar banco de dados",
                    time: "5 horas atrás",
                  },
                  {
                    action: "Comentou em",
                    name: "Deploy em produção",
                    time: "1 dia atrás",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {activity.action}{" "}
                        <span className="text-primary">{activity.name}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
