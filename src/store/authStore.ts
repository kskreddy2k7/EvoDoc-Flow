'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types';

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const storage = createJSONStorage(() => localStorage);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'evodoc-auth',
      storage,
      version: 1,
      partialize: (s) => ({ user: s.user }),
    }
  )
);

