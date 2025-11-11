import { api } from "@/lib/axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", userData);
    return data;
  },

  async getProfile(): Promise<AuthResponse["user"]> {
    const { data } = await api.get<AuthResponse["user"]>("/auth/profile");
    return data;
  },
};
