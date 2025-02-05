import create from 'zustand';

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
      // Simuler une authentification avec différents rôles
      const mockUser: User = {
        id: '1',
        name: 'Jane Doe',
        email,
        role: email.includes('admin') ? 'admin' : email.includes('editor') ? 'editor' : 'user',
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
    set({ user: null, isAuthenticated: false });
  },
  hasAccess: (roles: string[]) => {
    const { user } = get();
    if (!user) return false;
    return roles.includes(user.role);
  },
}));