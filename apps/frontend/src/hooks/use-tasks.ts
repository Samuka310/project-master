"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  tasksService,
  type CreateTaskData,
  type UpdateTaskData,
} from "@/services/tasks.service";
import { toast } from "sonner";

export function useTasks() {
  const queryClient = useQueryClient();

  // Query: Listar tarefas
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getAll,
  });

  // Mutation: Criar tarefa
  const createTask = useMutation({
    mutationFn: tasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar tarefa");
    },
  });

  // Mutation: Atualizar tarefa
  const updateTask = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      tasksService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa atualizada!");
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa");
    },
  });

  // Mutation: Deletar tarefa
  const deleteTask = useMutation({
    mutationFn: tasksService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa deletada!");
    },
    onError: () => {
      toast.error("Erro ao deletar tarefa");
    },
  });

  // Mutation: Toggle (marcar como concluída/não concluída)
  const toggleTask = useMutation({
    mutationFn: tasksService.toggleComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar status");
    },
  });

  return {
    tasks: tasks || [],
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
