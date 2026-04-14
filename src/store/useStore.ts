import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Patient, Appointment, AppointmentStatus } from '@/types';

export type ThemeType = 'light' | 'dark' | 'blue' | 'contrast';

interface AppState {
  // Theme
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;

  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Patients
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),

      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      patients: [],
      addPatient: (patient) => set((state) => ({ 
        patients: [patient, ...state.patients] 
      })),
      updatePatient: (id, updatedPatient) => set((state) => ({
        patients: state.patients.map((p) => p.id === id ? { ...p, ...updatedPatient } : p)
      })),

      appointments: [],
      addAppointment: (appointment) => set((state) => ({
        appointments: [appointment, ...state.appointments]
      })),
      updateAppointment: (id, updatedAppointment) => set((state) => ({
        appointments: state.appointments.map((a) => a.id === id ? { ...a, ...updatedAppointment } : a)
      })),
      cancelAppointment: (id) => set((state) => ({
        appointments: state.appointments.map((a) => a.id === id ? { ...a, status: 'Cancelled' as AppointmentStatus } : a)
      })),
      deleteAppointment: (id) => set((state) => ({
        appointments: state.appointments.filter((a) => a.id !== id)
      })),
    }),
    {
      name: 'evodoc-storage',
    }
  )
);
