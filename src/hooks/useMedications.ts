import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMedicationStore } from '../store/medicationStore';
import { MedicationService } from '../services/medicationService';
import { Medication } from '../types';

export function useMedications(userId: string) {
  const { setMedications, setLoading, setError } = useMedicationStore();

  const query = useQuery({
    queryKey: ['medications', userId],
    queryFn: () => MedicationService.fetchMedications(userId),
    enabled: !!userId,
  });

  React.useEffect(() => {
    if (query.data) {
      setMedications(query.data);
      setLoading(false);
    }
    if (query.error) {
      setError((query.error as Error).message);
      setLoading(false);
    }
  }, [query.data, query.error, setMedications, setLoading, setError]);

  return {
    medications: query.data || [],
    isLoading: query.isLoading || false,
    error: query.error?.message || null,
    refetch: query.refetch,
  };
}

export function useCreateMedication() {
  const queryClient = useQueryClient();
  const { addMedication } = useMedicationStore();

  return useMutation({
    mutationFn: MedicationService.createMedication,
    onSuccess: (newMedication) => {
      addMedication(newMedication);
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}

export function useUpdateMedication() {
  const queryClient = useQueryClient();
  const { updateMedication } = useMedicationStore();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Medication> }) =>
      MedicationService.updateMedication(id, updates),
    onSuccess: (updatedMedication) => {
      updateMedication(updatedMedication.id, updatedMedication);
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}

export function useDeleteMedication() {
  const queryClient = useQueryClient();
  const { removeMedication } = useMedicationStore();

  return useMutation({
    mutationFn: MedicationService.deleteMedication,
    onSuccess: (_, id) => {
      removeMedication(id);
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}
