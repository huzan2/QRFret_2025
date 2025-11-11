import { create } from 'zustand';

const PW = import.meta.env.VITE_REACT_APP_PASSWORD;

interface AdminState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  login: (password: string) => {
    if (password === PW) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
}));
