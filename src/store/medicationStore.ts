import { create } from 'zustand';
import { Medication } from '../types';

interface MedicationState {
  medications: Medication[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setMedications: (medications: Medication[]) => void;
  addMedication: (medication: Medication) => void;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  removeMedication: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMedicationStore = create<MedicationState>((set, get) => ({
  medications: [],
  isLoading: false,
  error: null,

  setMedications: (medications) => set({ medications }),

  addMedication: (medication) =>
    set((state) => ({
      medications: [...state.medications, medication],
    })),

  updateMedication: (id, updates) =>
    set((state) => ({
      medications: state.medications.map((med) =>
        med.id === id ? { ...med, ...updates } : med
      ),
    })),

  removeMedication: (id) =>
    set((state) => ({
      medications: state.medications.filter((med) => med.id !== id),
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
