import { api } from "@/lib/axios";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const tasksService = {
  async getAll(): Promise<Task[]> {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  async getById(id: string): Promise<Task> {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  async create(taskData: CreateTaskData): Promise<Task> {
    const { data } = await api.post<Task>("/tasks", taskData);
    return data;
  },

  async update(id: string, taskData: UpdateTaskData): Promise<Task> {
    const { data } = await api.patch<Task>(`/tasks/${id}`, taskData);
    return data;
  },

  async delete(id: string): Promise<Task> {
    const { data } = await api.delete<Task>(`/tasks/${id}`);
    return data;
  },

  async toggleComplete(id: string): Promise<Task> {
    const { data } = await api.patch<Task>(`/tasks/${id}/toggle`);
    return data;
  },
};
