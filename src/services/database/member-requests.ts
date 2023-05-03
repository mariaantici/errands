import { supabase } from '@/utils/supabaseClient';



// Fetch the member request
export async function fetchRequest(userId: string): Promise<{ list_id: string, list_name: string } | null> {
    try {
        const { data, error } = await supabase
            .from('member-requests')
            .select('list_id, list_name')
            .eq('user_id', userId)
            .single();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error searching for member invite', error);
        throw error;
    }
}
