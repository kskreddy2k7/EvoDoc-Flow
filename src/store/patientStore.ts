'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Patient } from '@/types';
import { createStableId } from '@/lib/id';

type PatientInput = Omit<Patient, 'id'> & { id?: string };

type PatientState = {
  patients: Patient[];
  addPatient: (patient: PatientInput) => string;
  updatePatient: (id: string, patch: Partial<Patient>) => void;
  getPatientById: (id: string) => Patient | undefined;
  resetPatients: () => void;
};

const storage = createJSONStorage(() => localStorage);

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      patients: [],
      addPatient: (patient) => {
        const id = patient.id ?? createStableId();
        set((state) => ({ patients: [{ ...patient, id }, ...state.patients] }));
        return id;
      },
      updatePatient: (id, patch) =>
        set((state) => ({
          patients: state.patients.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      getPatientById: (id) => get().patients.find((p) => p.id === id),
      resetPatients: () => set({ patients: [] }),
    }),
    {
      name: 'evodoc-patients',
      storage,
      version: 1,
      partialize: (s) => ({ patients: s.patients }),
    }
  )
);

