import { supabase } from '@/utils/supabaseClient';
import { Errand } from '@/services/types';

// Create new errand in errands table
export async function createErrand(userId: string, list_name: string, name: string, date: Date): Promise<void> {
    try {
        const { error } = await supabase
            .from('errands')
            .insert({ user_id: userId, list_name: list_name, name: name, date: date });

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error creating new errand', error);
        throw error;
    }
}

// Fetch all errands for user using the user's id and date
export async function getErrands(userId: string, date: string): Promise<{}[] | null> {
    try {
        const { data, error } = await supabase
            .from('errands')
            .select('list_name, name, status')
            .eq('user_id', userId)
            .eq('date', date)

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error fetching errands', error);
        throw error;
    }
}