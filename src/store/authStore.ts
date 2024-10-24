import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

const useAuthStore = create<AuthState & {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useAuthStore;