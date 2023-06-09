import { supabase } from '@/utils/supabaseClient';

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
            .select('id, user_id, list_name, name, status')
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

// Update errand's status
export async function updateErrandStatus(id: string, status: boolean): Promise<{}[] | null> {
    try {
        const { data, error } = await supabase
            .from('errands')
            .update({ 'status': status })
            .eq('id', id);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error updating errand status', error);
        throw error;
    }
}

// Update errand's date
export async function updateErrandDate(id: string, date: Date): Promise<{}[] | null> {
    try {
        const { data, error } = await supabase
            .from('errands')
            .update({ 'date': date, 'status': false })
            .eq('id', id);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error updating errand date', error);
        throw error;
    }
}

// Delete errand
export async function deleteErrand(errandId: string): Promise<void> {
    try {
        const { data, error } = await supabase
            .from('errands')
            .delete()
            .eq('id', errandId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error updating errand date', error);
        throw error;
    }
}
