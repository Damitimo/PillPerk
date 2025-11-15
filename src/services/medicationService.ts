import { supabase } from '../lib/supabase';
import { Medication } from '../types';

export class MedicationService {
  static async fetchMedications(userId: string): Promise<Medication[]> {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createMedication(medication: Omit<Medication, 'id' | 'created_at' | 'updated_at'>): Promise<Medication> {
    const { data, error } = await supabase
      .from('medications')
      .insert([medication])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateMedication(id: string, updates: Partial<Medication>): Promise<Medication> {
    const { data, error } = await supabase
      .from('medications')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteMedication(id: string): Promise<void> {
    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
