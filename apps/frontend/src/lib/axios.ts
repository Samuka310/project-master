import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

// URL base da API (vamos configurar .env depois)
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Criar instância do axios
export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Request (adiciona token automaticamente)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de Response (trata erros globalmente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se 401 (não autorizado), faz logout
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
