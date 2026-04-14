'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types';

export type ThemeType = 'light' | 'dark' | 'blue' | 'contrast';

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const storage = createJSONStorage(() => localStorage);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'evodoc-auth',
      storage,
      version: 1,
      partialize: (s) => ({ user: s.user, theme: s.theme }),
    }
  )
);

