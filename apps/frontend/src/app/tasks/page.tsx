"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Check, X } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useTasks } from "@/hooks/use-tasks";

export default function TasksPage() {
  const { user } = useAuth();
  const { tasks, isLoading, createTask, deleteTask, toggleTask } = useTasks();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleCreateTask = () => {
    if (!newTask.title.trim()) return;

    createTask.mutate(
      {
        title: newTask.title,
        description: newTask.description || undefined,
      },
      {
        onSuccess: () => {
          setNewTask({ title: "", description: "" });
          setIsDialogOpen(false);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
            <p className="text-muted-foreground mt-1">
              {tasks.length} {tasks.length === 1 ? "tarefa" : "tarefas"} no
              total
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {pendingTasks.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedTasks.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Tarefas Pendentes */}
        {pendingTasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pendentes</h2>
            {pendingTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{task.title}</CardTitle>
                        {task.description && (
                          <CardDescription className="mt-2">
                            {task.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleTask.mutate(task.id)}
                          disabled={toggleTask.isPending}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteTask.mutate(task.id)}
                          disabled={deleteTask.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lista de Tarefas Concluídas */}
        {completedTasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Concluídas</h2>
            {completedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-muted/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="line-through opacity-70">
                          {task.title}
                        </CardTitle>
                        {task.description && (
                          <CardDescription className="mt-2 line-through opacity-50">
                            {task.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleTask.mutate(task.id)}
                          disabled={toggleTask.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteTask.mutate(task.id)}
                          disabled={deleteTask.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mensagem vazia */}
        {tasks.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                Nenhuma tarefa criada ainda. Clique em Nova Tarefa para começar!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog de Nova Tarefa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
            <DialogDescription>
              Preencha os dados da nova tarefa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Título da tarefa"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>
            <div>
              <Textarea
                placeholder="Descrição (opcional)"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateTask}
              disabled={!newTask.title.trim() || createTask.isPending}
            >
              {createTask.isPending ? "Criando..." : "Criar Tarefa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
