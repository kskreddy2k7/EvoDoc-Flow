'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Appointment, AppointmentStatus } from '@/types';
import { createStableId } from '@/lib/id';

type AppointmentInput = Omit<Appointment, 'id'> & { id?: string };

type AppointmentState = {
  appointments: Appointment[];
  addAppointment: (appointment: AppointmentInput) => string;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
  resetAppointments: () => void;
};

const storage = createJSONStorage(() => localStorage);

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: [],
      addAppointment: (appointment) => {
        const id = appointment.id ?? createStableId();
        set((state) => ({ appointments: [{ ...appointment, id }, ...state.appointments] }));
        return id;
      },
      updateAppointment: (id, patch) =>
        set((state) => ({
          appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        })),
      cancelAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status: 'Cancelled' as AppointmentStatus } : a
          ),
        })),
      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((a) => a.id !== id),
        })),
      getAppointmentById: (id) => get().appointments.find((a) => a.id === id),
      resetAppointments: () => set({ appointments: [] }),
    }),
    {
      name: 'evodoc-appointments',
      storage,
      version: 1,
      partialize: (s) => ({ appointments: s.appointments }),
    }
  )
);

