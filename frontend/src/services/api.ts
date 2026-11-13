import axios from 'axios';
import type { AuthResponse, RegisterPayload, User } from '../types/auth';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Додаємо токен до запитів
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Обробляємо помилку авторизації
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }

    return Promise.reject(error);
  }
);

// Методи авторизації
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/token/', {
      email,
      password,
    });

    return response.data;
  },

  register: async (data: RegisterPayload): Promise<User> => {
    const response = await api.post<User>('/auth/register/', data);
    return response.data;
  },

  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/google/', {
      id_token: idToken,
    });

    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/users/profile/');
    return response.data;
  },
};

export default api;