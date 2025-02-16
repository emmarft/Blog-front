import axios from 'axios';
import { create } from 'zustand';
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'editor';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  hasAccess: (roles: string[]) => boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('http://127.0.0.1:3000/login', { email, password });

      const { token } = response.data;
      if (!token) {
        throw new Error('Token manquant dans la réponse');
      }

      localStorage.setItem('authToken', token);

      const decodedUser: any = jwtDecode(token);

      const mockUser: User = {
        id: decodedUser.userId || decodedUser.sub || 'unknown', // Ajuste selon la structure du token
        name: decodedUser.name || decodedUser.email,
        email: decodedUser.email,
        role: decodedUser.role || 'user', // Valeur par défaut
      };

      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('authToken');
    set({ user: null, isAuthenticated: false });
  },
  hasAccess: (roles: string[]) => {
    const { user } = get();
    if (!user) return false;
    return roles.includes(user.role);
  },

}));

