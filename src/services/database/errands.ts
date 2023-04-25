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