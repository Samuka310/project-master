import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

// Tipos
interface Profile {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  phone: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProfileStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

interface UpdateProfileData {
  name?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
}

export function useProfile() {
  const queryClient = useQueryClient();

  // Buscar perfil
  const { data: profile, isLoading: isLoadingProfile } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/profile");
      return response.data;
    },
  });

  // Buscar estatísticas
  const { data: stats, isLoading: isLoadingStats } = useQuery<ProfileStats>({
    queryKey: ["profile-stats"],
    queryFn: async () => {
      const response = await api.get("/profile/stats");
      return response.data;
    },
  });

  // Atualizar perfil
  const updateProfile = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await api.put("/profile", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao atualizar perfil");
    },
  });

  return {
    profile,
    stats,
    isLoading: isLoadingProfile || isLoadingStats,
    updateProfile,
  };
}
