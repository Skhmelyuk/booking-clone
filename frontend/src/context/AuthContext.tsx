
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import type {
  User,
  AuthResponse,
  RegisterPayload,
} from '../types/auth';

import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user_data');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('user_data');
      }
    }

    return null;
  });

  const saveAuthSession = (data: AuthResponse) => {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user_data', JSON.stringify(data.user));

    setUser(data.user);
  };

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    saveAuthSession(data);
  };

  const register = async (payload: RegisterPayload) => {
    await authService.register(payload);
    await login(payload.email, payload.password);
  };

  const googleLogin = async (idToken: string) => {
    const data = await authService.googleLogin(idToken);
    saveAuthSession(data);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
