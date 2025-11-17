import axios from "axios";

// URL da API (backend)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Instância do axios configurada
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    // Pega token do localStorage (se existir)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Adiciona token no header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se retornar 401 (não autorizado), redireciona para login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
